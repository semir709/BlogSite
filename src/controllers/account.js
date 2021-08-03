require('dotenv').config();

let db = require('../config/dataBase');
let custom = require('../config/custom');
let randomStrings = require('randomstring');
const mailMsg = require('../config/mailMessages');
const { hash } = require('bcrypt');
const { response } = require('express');
const dataBase = require('../config/dataBase');
const passport = require('passport');


exports.login = (req, res) => {
    res.render('login');
};

exports.loginPost = passport.authenticate('local', {
    successRedirect: '/admin',
    failureMessage:'/login',
    failureFlash:true
}),
 (req, res, next) => {
    
    res.redirect('/admin');
    // let con = db.getCon();
    // const data = req.body;
    // let samePasword;

    // let errors = []; 


    // let mailRes = await db.getMail(con, data.email);

    // if(mailRes.length == 0) {
    //     errors.push({msg: 'email is required'})
    //     res.redirect('/login');
    // }

    // else {
    //     samePasword = await custom.compare(data.password, mailRes[0].admin_password);
    // }

    // if(samePasword){
    //     if(mailRes[0].superAdmin == true) {
    //         //super admin privilage
    //         res.redirect('/qadmin');
    //     }

    //     else {
    //         //admin privilage
    //         res.redirect('/admin');
    //     }
        
    // }
    // else {
    //     errors.push({msg: 'Password is not correct'});
    //     res.redirect('/login');
    // }




    // con.end();

    
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

    if(m[0].length !== 0) {errors.push({msg:'User with this mail already exsist in our dataBase'});
    }
    
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

        con.query('INSERT INTO admin_u VALUES (0,?,?,?,?,?,?,?,?)', [
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

/*exports.getConfrm = async (req, res) => {
    res.render('configuration');
    const {token} = req.params;
    const con = dataBase.getCon();

    const queryRes = await con.promise().query('SELECT * FROM admin_u WHERE token = ?', [token]);

    if(queryRes[0].length === 0) {
        console.log('you are not having right token to confrm registration');
    }
    else {
        console.log(queryRes[0]);
        await con.promise().query('UPDATE admin_u SET token = "" AND confirmed = false WHERE admin_id = ?', [queryRes[0].admin_id]);
    }

    UPDATE admin_u
SET token = "", confirmed = true 
WHERE admin_id = 255;

}*/

