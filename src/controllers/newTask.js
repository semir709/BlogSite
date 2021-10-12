const multer = require('multer');
const db = require('../config/dataBase');
const custom = require('../config/custom');
const { application } = require('express');
 
async function saveContent (inputValues, data, cb) {

    const con = db.getCon();
    let msg;

    console.log(data);
    con.promise().query('SELECT * FROM content WHERE img = ?', [inputValues.image_name])
    .then(res => {

        if(res[0].length > 0) {
            
            msg = 'error 0';
            return cb(msg);
        }
        else {
            con.promise().query('INSERT INTO content VALUES (0, ?, ?, ?, ?, now())',
            [inputValues.user,data.heading, data.article, inputValues.image_name])
            
            .then(() => {
                
                msg = 'done';

                return cb(msg);
            
            }).catch(err => {
                
                msg = 'error 1';
                return cb(msg);
            });
        }

    }).catch(err => {console.log(err); msg = 'error 2';return cb(msg);});

}

module.exports = { 

    storeImg: async (req, res) => {
        let upload = multer({storage: custom.imageStorage()}).single('img');
        let msg;

        upload(req, res, async function(err) {

            if (err instanceof multer.MulterError) {
                res.send(err);
             } else if (err) {
                res.send(err);
             }else{
                    
                 let imageName = req.file.originalname; //error when is req.file.orginalName udentifed
                 let inputValues = {
                    image_name: imageName,
                    user: req.user.admin_id
                 }
               
                    saveContent(inputValues,req.body, function(data) {

                        if(data == 'error 0') {
                            req.flash('msgError0', 'The Image already exist in database');
                        }
                        if(data == 'error 1') {
                            req.flash('msgError1', 'Error when saving the image to database');
                        }
                        if(data == 'error 2') {
                            req.flash('msgError2', 'Error when searching for the image');
                        }
                        if(data == 'done') {
                            req.flash('msgImgSuccess', 'The article is published');
                            
                        }
                           
                        res.redirect('/qadmin');
                    });
                  
               
                }
        });

        
    }

}