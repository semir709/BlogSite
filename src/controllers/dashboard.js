const { response } = require('express');
const db = require('../config/dataBase');
const custom = require('../config/custom');

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


exports.deleteData = (req, res) => {

    const con = db.getCon();

    //in req we got user who is signed which mean that we can in that way not alow uset to not delete yourself

    con.promise().query('DELETE FROM admin_u WHERE admin_id = ?', [req.params.id])
    .then(response => {
         
        con.promise().query('SELECT * FROM admin_u')
        .then(data => {
            
            res.render('dashboard/adminManage.ejs', {data: data[0]});
        });
      
    }).catch(err => {
        throw err.message;
    });
}

exports.updateData = (req, res) => {
    const con = db.getCon();
    const data = req.body;

    data.confrm = custom.convertCheckBoxConfrm(data);
    data.admin = custom.convertCheckBoxAdmin(data);

    con.promise().query(`UPDATE admin_u SET admin_name = ? , admin_surname = ?, admin_mail = ?,
     time_reg = ?, confirmed = ?, superAdmin = ? WHERE admin_id = ? `,
     [
         data.name,
         data.lastName,
         data.mail,
         data.time,
         data.confrm,
         data.admin,
         req.params.id
     ]
     ).then(() => {
        con.promise().query('SELECT * FROM admin_u')
        .then(data => {
            
            res.render('dashboard/adminManage.ejs', {data: data[0]});
        });
     }).catch((err) => {throw err.message});
}