const { query } = require('express');
const custom = require('../config/custom');
const db = require('../config/dataBase');

module.exports = {
    main: async function(req, res) {

        const con = db.getCon();

        let data = await con.promise().query(`
        SELECT content.content_id, content.header, content.clickbait, content.article, content.img, content.content_time,
        admin_u.admin_name, admin_u.admin_surname, tags.tag FROM content INNER JOIN admin_u ON content.user_id = admin_u.admin_id 
        INNER JOIN content_tags ON content_tags.content_id = content.content_id
        INNER JOIN tags ON tags.tag_id = content_tags.tag_id
        ORDER BY content_id DESC`);


        let dataObj = custom.loadingNextPage(req.query.pa, data, false);

        
        res.render('main/home.ejs', {data:dataObj.trimData, firstPage: dataObj.firstPage, pages:dataObj.pages, maxLeft: dataObj.maxLeft, maxRight: dataObj.maxRight});
    },

    listingPages: async function(req, res) {

        const con = db.getCon();

        let data = await con.promise().query(`
        SELECT content.content_id, content.header, content.clickbait, content.article, content.img, content.content_time,
        admin_u.admin_name, admin_u.admin_surname,tags.tag FROM content INNER JOIN admin_u ON content.user_id = admin_u.admin_id 
        INNER JOIN content_tags ON content_tags.content_id = content.content_id
        INNER JOIN tags ON tags.tag_id = content_tags.tag_id
        ORDER BY content_id DESC`);

        let dataObj = custom.loadingNextPage(req.query.pa, data, false);
        // console.log(dataObj.maxLeft);
        res.render('main/nextPage.ejs', {data: dataObj.trimData, firstPage: dataObj.firstPage, pages: dataObj.pages, maxLeft: dataObj.maxLeft, maxRight: dataObj.maxRight}); 
        
        
    },
    category: async function (req, res) {
        console.log(req.params)
        const con = db.getCon();

        let data = await con.promise().query(`
            SELECT tags.tag, content.header, content.article, content.clickbait, content.img, content.content_time, content.content_id,
            admin_u.admin_name, admin_u.admin_surname FROM tags 
            INNER JOIN content_tags ON content_tags.tag_id = tags.tag_id
            INNER JOIN content ON content.content_id = content_tags.content_id
            INNER JOIN admin_u ON content.user_id = admin_u.admin_id
            WHERE tags.tag LIKE '%${req.params.tag}%' ORDER BY content.content_id DESC;
        `);

        console.log(data[0]);
        console.log(req.query.pa);
        let dataObj = custom.loadingNextPage(req.query.pa, data, true);

        res.render('main/category.ejs',{data: dataObj.trimData, firstPage: dataObj.firstPage, pages: dataObj.pages, maxLeft: dataObj.maxLeft, maxRight: dataObj.maxRight});
    },
    software: function(req, res) {
        res.render('main/software.ejs');
    },
    network:function(req, res) {
        res.render('main/network.ejs');
    },
    code: function(req, res) {
        res.render('main/code.ejs');
    },
    aboutUs: function(req, res) {
        res.render('main/about.ejs');
    }
}