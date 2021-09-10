require('dotenv').config();

let db = require('../config/dataBase');
let custom = require('../config/custom');
let randomStrings = require('randomstring');
const mailMsg = require('../config/mailMessages');
const { hash } = require('bcrypt');
const { response } = require('express');
//const dataBase = require('../config/dataBase');
const passport = require('passport');


exports.login = (req, res) => {
    res.render('login', {message: req.flash('error')});
    
};

exports.loginAuth = (req,res,next) =>{

    passport.authenticate('local',{
        failureRedirect:'/login',
        failureFlash:true
    })(req,res,next);
}

exports.loginPost = (req,res) => {

    if(req.user.superAdmin) {
        res.redirect('qadmin');
    }

    else {
        res.redirect('/admin');
    }
}

exports.createAc = (req, res) => {
    res.render('createAccount');
};


exports.createAcPost = async (req, res) => {

    const {name, lastName, mail, password,password2, about} = req.body;
    let con = db.getCon();

    const errors = [];
    const speChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    let token = randomStrings.generate();
    let confirm = false;

    const html = `Hi there,
    <br/>
    Thank you for registring!
    <br/> <br/>
    Please wait for confrming you're registration 
    <br/> <br/>
    Have nice day!`;

    let m = await con.promise().query('SELECT *  FROM admin_u WHERE admin_mail = ?', [mail]);

   // if(m[0].length !== 0) {errors.push({msg:'User with this mail already exsist in our dataBase'});
    //}
    
    if(!name || !lastName || !mail || !password || !about) {
        errors.push({msg: 'All filds are required'});
    }

    if(speChar.test(name) || /\d/.test(name)) {
        errors.push({msg: 'Is not alow to use numbers or symbols in name field'})
    }

    if(speChar.test(lastName) || /\d/.test(lastName)) {
        errors.push({msg: 'Is not alow to use numbers or symbols in last name field'})
    }
    //test
    if(speChar.test(lastName)) { console.log('syblos');}
    if(/\d/.test(lastName)) console.log('numbers');

    if(password2 != password) {
        errors.push({msg: 'passwords not match!!!'})
    }

    if(errors.length > 0) {
        
        res.render('createAccount.ejs', {
            errors,
            name,
            lastName,
            mail,
            about,
            password,
            password2
        });
    }
    else {
        let hash = await custom.saltAndHash(password, 14);

        con.query('INSERT INTO admin_u VALUES (0,?,?,?,?,?,CURDATE(),?,?,?)', [
            name,
            lastName,
            mail,
            hash,
            about,
            token,
            confirm,
            false
        ],(err, res) => {
            if(err) console.error(err);
        });

        await custom.sendMail('Bpostmaster@sandbox777f9b2f03ce48c8aa012711fb7b34df.mailgun.org', 'Thanks for your intrest', mail, html);

        con.end();

        req.flash('msgSuccess', 'You are registred, now wait for admin to confrmed your account');        
        
        res.redirect('/login');
    }
    
};


