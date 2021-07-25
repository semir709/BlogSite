require('dotenv').config();

let db = require('../config/dataBase');
let custom = require('../config/custom');
let randomStrings = require('randomstring');
const mailMsg = require('../config/mailMessages');
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

    const {name, lastName, mail, password, about} = req.body;
    let con = db.getCon();

    const errors = [];
    const speChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    const html = mailMsg.htmlVerfy;

    await custom.sendMail('Bpostmaster@sandbox777f9b2f03ce48c8aa012711fb7b34df.mailgun.org', 'Please verify your email', mail, html);


    let token = randomStrings.generate();
    let confirm = false;

    let m = await con.promise().query('SELECT *  FROM admin_u WHERE admin_mail = ?', [mail]);

    if(m[0].length !== 0) {errors.push({msg:'User with this mail already exsist in our dataBase'});
    }
    
    if(!name || !lastName || !mail || !password || !about) {
        errors.push({msg: 'All filds are required'});
    }

    if(speChar.test(name) || /d/.test(name)) {
        errors.push({msg: 'Is not alow to use numbers or symbols in name field'})
    }

    if(speChar.test(lastName) ||/d/.test(lastName)) {
        errors.push({msg: 'Is not alow to use numbers or symbols in last name field'})
    }

    let hash = await custom.saltAndHash(password, 14);

    con.query('INSERT INTO admin_u VALUES (0,?,?,?,?,?,?,?)', [
        name,
        lastName,
        mail,
        hash,
        about,
        token,
        confirm
    ],(err, res) => {
        if(err) console.error(err);
    });



    con.end();

    res.redirect('/login/create')
};


