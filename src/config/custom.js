let bcrypt = require('bcrypt');
require('dotenv').config({path: '../.env'});
let nodemailer = require('nodemailer');

const multer = require('multer');


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

    sendMail: function(from, subject, to, html) {
        return new Promise((reslove, reject) => {
            transport.sendMail({from, subject, to, html}, (err,info) => {
                if(err) reject(err);

                reslove(info);
            });
        });
    },
    convertCheckBoxConfrm: function(data) {
        let convData;

        if(data.confrm == 'on') {
            convData = 1;
        }
        else {
            convData = 0;
        }

        return convData;
    }, 

    convertCheckBoxAdmin: function(data) {
        let convData;

        if(data.admin == 'on') {
            convData = 1;
        }
         else {
            convData = 0;
         }

         return convData;
     },

     imageStorage: function() {
         const storage = multer.diskStorage({
             destination: (req, file, cb) => {
                
                 cb(null, 'public/img');
             },
             filename: (req, file, cb) => {
                 
                 cb(null, file.originalname);
             }
         })


         return storage;
     },

     loadingNextPage(pagePar, data, isCategory) {
         let firstPage;
         let rows;
         let page;
         let maxDisplyButt = 9;

        if(typeof pagePar == 'undefined' ) {
            page = 1;
            rows = 18;
            firstPage = true;
        }

        else if(typeof pagePar == 'undefined' && isCategory == true) {
            page = 1;
            rows = 18;
            firstPage = false;
            
        }

        else {
            page = pagePar
            rows = 18;
            firstPage = false;
        }

        let indexStart = (page - 1) * rows;
        let indexEnd = indexStart + rows;

        let trimData = data[0].slice(indexStart, indexEnd);

        let pages = Math.ceil(data[0].length / rows);

        let maxLeft = (page - Math.floor(maxDisplyButt / 2));
        let maxRight = (parseInt(page) + Math.floor(maxDisplyButt / 2));


        if(maxLeft < 1) {
            maxLeft = 1;
            maxRight = maxDisplyButt;
        }

        if(maxRight > pages) {
            maxLeft = pages - (maxDisplyButt - 1);

            maxRight = pages;

            if(maxLeft < 1) {
                maxLeft = 1;
            }
        }

        return {trimData, pages, firstPage, maxLeft, maxRight}
     }
}