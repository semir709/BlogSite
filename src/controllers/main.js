const db = require('../config/dataBase');

module.exports = {
    main: async function(req, res) {

        const con = db.getCon();

        let data = await con.promise().query('SELECT content_id, header, article, img, content_time FROM content');
        
        console.log(data[0]);

        res.render('main/home.ejs', {data: data[0]});
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