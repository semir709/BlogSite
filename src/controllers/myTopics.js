const db = require('../config/dataBase');
const custom = require('../config/custom');
const multer = require('multer');
const fs = require('fs');

module.exports = {
    delete: function (req, res) {
        let id = req.body.contentId;
        let con = db.getCon();

        //add way to delete img also while deleting content!!!

        con.promise().query('DELETE FROM content WHERE content_id = ?', [id])
        .then(async respond => {
            const data = await con.promise().query('SELECT * FROM content WHERE user_id = ?', [req.user.admin_id]);
            res.render('dashboard/myTopic.ejs', {data:data[0]});
        })
        .catch(err => {console.log(err)});


    },
    update: async function(req, res) {
        let id = req.body.contentId;

        const con = db.getCon();
        const data = await con.promise().query('SELECT * FROM content WHERE content_id = ?', [id]);
        
        res.render('dashboard/newTopic.ejs', {data:data[0][0]});
    },        
    
    finalUpdateImg: async function (req, res,cb) {
        
        let upload = multer({storage: custom.imageStorage()}).single('img');
    
        
        upload(req, res, async function(err) {

            if (err instanceof multer.MulterError) {
                req.Errmsg = true;
            
             } else if (err) {
                req.msg = true;
                
            }
            cb();  
            
        });      
        

    },
    finalUpdateDb: function(req, res) {
        let data = req.body;
        let con = db.getCon();

        if(req.Errmsg) {
            req.flash('multerErrMsg', 'Img is not saved!!!');
            res.redirect('/qadmin');
        }

        else {
    
            con.promise().query('UPDATE content SET header = ?, clickbait = ?, article = ?, img = ?, content_time = now() WHERE content_id = ?',
            [
                data.heading,
                data.clickbait,
                data.article,
                data.imgName,
                data.id
            ]
            )
            .then(result => {
                req.flash('msgImgSuccess', 'The article is published');
                res.redirect('/qadmin');
            })
            .catch(err => {
                console.log(err);
                let path = req.file.destination + "/" +req.file.originalname;

                if(err) {
                    con.promise().query('SELECT * FROM content WHERE img = ?', [req.file.filename])
                    .then(ressult => {
    
                        if(ressult[0].length > 0) {
                            
                        }
                        else {
                            fs.unlinkSync(path);
                        }
                    })
                    .catch(err => {console.log(err)});

                    req.flash('msgUpdateErr', 'Something happened while updating data');
                    res.redirect('/qadmin');

                }
                
            });  
            }

    }
}
