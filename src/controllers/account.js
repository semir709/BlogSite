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

    let errors = []; 


    let mailRes = await db.getMail(con, data.email);

    if(mailRes.length == 0) {
        errors.push({msg: 'email is required'})
    }

    else {
        samePasword = await custom.compare(data.password, mailRes[0].admin_password);
    }

    if(samePasword) console.log('Same password');
    else errors.push({msg: 'Password is not correct'})




    con.end();
    
}

exports.createAc = (req, res) => {
    res.render('createAccount');
};


exports.createAcPost = async (req, res) => {

    let data = req.body;
    let con = db.getCon();

    const errors = [];
    const speChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    //check mail is validate

    //send message to that mail

    let m = await con.promise().query('SELECT *  FROM admin_u WHERE admin_mail = ?', [data.mail]);

    if(m[0].length !== 0) {
        errors.push({msg:'User with this mail already exsist in our dataBase'});
    }
    
    if(!data.name || !data.lastName || !data.mail || !data.password || !data.about) {
        errors.push({msg: 'All filds are required'});
    }

    if(speChar.test(data.name) || /d/.test(data.name)) {
        errors.push({msg: 'Is not alow to use numbers or symbols in name field'})
    }

    if(speChar.test(data.lastName) ||/d/.test(data.lastName)) {
        errors.push({msg: 'Is not alow to use numbers or symbols in last name field'})
    }

    let hash = await custom.saltAndHash(data.password, 14);

    db.storeAdminData(con, data.name, data.lastName, data.mail, hash, data.about);



    con.end();
};


