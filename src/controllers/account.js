let db = require('../config/dataBase');
let custom = require('../config/custom');
const { hash } = require('bcrypt');
const { response } = require('express');


exports.login = (req, res) => {
    res.render('login');
};

exports.loginPost = async (req, res) => {
    
    let con = db.getCon();
    const data = req.body;
    let samePasword;


    let mailRes = await db.getMail(con, data.email);

    if(mailRes.length == 0) {
        console.log('Mail is not correct!!!');
    }

    else {
        samePasword = await custom.compare(data.password, mailRes[0].admin_password);
    }

    if(samePasword) console.log('Same password');
    else console.log('Not same password');


    con.end();
    
}

exports.createAc = (req, res) => {
    res.render('createAccount');
};


exports.createAcPost = async (req, res) => {

    let data = req.body;
    let con = db.getCon();

    let hash = await custom.saltAndHash(data.password, 14);

    db.storeAdminData(con, data.name, data.lastName, data.mail, hash, data.about);



    con.end();
};


