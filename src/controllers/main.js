const custom = require('../config/custom');
const db = require('../config/dataBase');

module.exports = {
    main: async function(req, res) {

        const con = db.getCon();

        let data = await con.promise().query(`
        SELECT content.content_id, content.header, content.clickbait, content.article, content.img, content.content_time,
        admin_u.admin_name, admin_u.admin_surname FROM content INNER JOIN admin_u ON content.user_id = admin_u.admin_id 
        ORDER BY content_id DESC`);

        let dataObj = custom.loadingNextPage(req.query.pa, data);

        
        res.render('main/home.ejs', {data:dataObj.trimData, firstPage: dataObj.firstPage, pages:dataObj.pages, maxLeft: dataObj.maxLeft, maxRight: dataObj.maxRight});
    },

    listingPages: async function(req, res) {

        const con = db.getCon();

        let data = await con.promise().query(`
        SELECT content.content_id, content.header, content.clickbait, content.article, content.img, content.content_time,
        admin_u.admin_name, admin_u.admin_surname FROM content INNER JOIN admin_u ON content.user_id = admin_u.admin_id 
        ORDER BY content_id DESC`);

        let dataObj = custom.loadingNextPage(req.query.pa, data);
        // console.log(dataObj.maxLeft);
        res.render('main/nextPage.ejs', {data: dataObj.trimData, firstPage: dataObj.firstPage, pages: dataObj.pages, maxLeft: dataObj.maxLeft, maxRight: dataObj.maxRight}); 
        
        
    },
    hardware: function (req, res) {
        res.render('main/hardware.ejs');
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