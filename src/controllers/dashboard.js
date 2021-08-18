const db = require('../config/dataBase');

exports.getData = async (req, res) => {

    const con = db.getCon()
    const data = await con.promise().query('SELECT * FROM admin_u');

    res.render('dashboard/adminManage.ejs', {data: data[0]});
}

exports.newTopic = async (req, res) => {

    res.render('dashboard/newTopic.ejs');
}

exports.myTopic = async (req, res) => {

    res.render('dashboard/myTopic.ejs');
}

exports.comments = async (req, res) => {

    res.render('dashboard/comments.ejs');
}