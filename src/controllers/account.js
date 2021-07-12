let db = require('../config/dataBase');
let custom = require('../config/custom');
const { hash } = require('bcrypt');
const { response } = require('express');


exports.login = (req, res) => {
    res.render('login');
};

exports.loginPost = (req, res) => {
    
    let con = db.getCon();

   db.getMail(con, req.body.email)
   .then(response => {
       if(response.length == 0) {
           console.log('There is no mail such like that!!!');
        
       }
        else {
            custom.compare(req.body.password, response[0].admin_password)
            .then(res => {
                if(res) console.log('password is correct');
                else console.log('password is not correct');
            }).catch(err => console.error(err, 'Eroor in hash.compare')); 
        }
   }).catch(err => {con.end(); console.log(err);});

    
}

exports.createAc = (req, res) => {
    res.render('createAccount');
};


exports.createAcPost = (req, res) => {

    
    let data = req.body;
    let con = db.getCon();

    custom.saltAndHash(data.password, 10)
    .then(hash => {

     let val = await db.sendAmdinDataAsy( con, data.name, data.lastName, data.mail, hash, data.about);

     console.log(val);


        db.sendAdminData(con, data.name, data.lastName, data.mail, hash, data.about)
        .then(() => {con.end()});
    }); 

};


