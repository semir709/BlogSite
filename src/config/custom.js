let bcrypt = require('bcrypt');
require('dotenv').config({path: '../.env'});
let nodemailer = require('nodemailer');


const transport = nodemailer.createTransport({
    service:"Mailgun",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
     tls: {
         rejectUnauthorized: false
    }
    
});


module.exports = {
    
    saltAndHash: function(password, rounds) {
        return new Promise((res, rej) => {
           
            bcrypt.hash(password, rounds, (err, hash) => {
                if(err) rej(err);
                else {
                    res(hash);
                }
            });

        });
    },

    compare: (password, hash) => {
        return new Promise((res,rej) => {
            bcrypt.compare(password, hash, (err, same) => {
                if(err) rej(err);
                else {
                    res(same);
                }
                
            });
        });
    },

    comparee: (password, hash) => {
        bcrypt.compare(password, hash, (err, same) => {
            if(err) console.error(err);
            else {
                return same;
            }
        });
    },

    sendMail: function(from, subject, to, html ) {
        return new Promise((reslove, reject) => {
            transport.sendMail({from, subject, to, html}, (err,info) => {
                if(err) reject(err);

                reslove(info);
            });
        });
    }
}