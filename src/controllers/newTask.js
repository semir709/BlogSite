const multer = require('multer');
const db = require('../config/dataBase');
const custom = require('../config/custom');
const { application } = require('express');
 
async function saveContent (inputValues, data, cb) {

    const con = db.getCon();
    let msg;

    try {
        let imgRes = await con.promise().query('SELECT * FROM content WHERE img = ?', [inputValues.image_name]).catch(err => {
            console.log(err);
            msg = "error 1"
            return msg;
        });

        let contentRes = await con.promise().query('INSERT INTO content VALUES (0, ?, ?, ?, ?, ?, now())',
        [inputValues.user,data.heading, data.clickbait, data.article, inputValues.image_name]).catch(err => {
            console.log(err);
            msg = "error 2"
            return msg;
        });

        let tagsRes = await con.promise().query('INSERT INTO tags VALUES (0,?)', [JSON.stringify(data.tags)]).catch(err => {
            console.log(err);
            msg = "error 3"
            return msg;
        });

        let contentId = contentRes[0].insertId;
        let tagtId = tagsRes[0].insertId;

        let contentTags = await con.promise().query('INSERT INTO content_tags VALUES (?,?)', [contentId, tagtId]).catch(err => {
            console.log(err);
            msg = "error 4"
            return msg;
        });

        data.tags.forEach(t => {
            con.promise().query('INSERT INTO all_tags VALUES (0,?)', [t]).catch(err => {
                console.log(err);
                msg = "error 5";
                return msg;
            })
        });
        
        msg = 'done';
        return cb(msg);

    } catch(e) {
        console.log(e);
        msg = 'error 0';
        return msg;
    }

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
                
                let imageName;
                if(typeof req.file === 'undefined') {
                    imageName = 'empty' //Here we can letter add default image if the user didn't add the new image
                }
                else {
                    imageName = req.file.originalname;
                }

                 
                 let inputValues = {
                    image_name: imageName,
                    user: req.user.admin_id
                 }
                    
                    saveContent(inputValues,req.body, function(data) {

                        if(data == 'error 0') {
                            req.flash('msgError0', 'something is wrong');
                        }
                        if(data == 'error 1') {
                            req.flash('msgError1', 'Error when saving the image to database');
                        }
                        if(data == 'error 2') {
                            req.flash('msgError2', 'Error while inserting data in the dataBase');
                        }
                        if(data == 'error 3') {
                            req.flash('msgError3', 'Error while inserting tags in the dataBase');
                        }
                        if(data == 'error 4') {
                            req.flash('msgError4', 'Error while connecting tags with the content');
                        }
                        if(data == 'error 5') {
                            req.flash('msgError5', 'Error while saving tags');
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