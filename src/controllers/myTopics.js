const db = require('../config/dataBase');
const custom = require('../config/custom');
const multer = require('multer');
const fs = require('fs');

module.exports = {
    delete: function (req, res) {
        let id = req.body.contentId;
        let con = db.getCon();

        con.promise().query(`DELETE content, tags FROM content 
        INNER JOIN content_tags ON content_tags.content_id = content.content_id
        INNER JOIN tags ON tags.tag_id = content_tags.tag_id
        WHERE content.content_id = ?;`, [id])
        .then(async respond => {
            const data = await con.promise().query(`
            SELECT content.content_id, header, clickbait, img, tag FROM content
            INNER JOIN content_tags ON content.content_id = content_tags.content_id
            INNER JOIN tags ON content_tags.tag_id = tags.tag_id WHERE content.user_id = ?`, [req.user.admin_id]);

            res.render('dashboard/myTopic.ejs', {data:data[0]});
        })
        .catch(err => {console.log(err)});


    },
    update: async function(req, res) {
        let id = req.body.contentId;
        let tags = req.body.tags;
        // let imgName = req.body.img;

        // console.log(imgName);

        const con = db.getCon();
        const data = await con.promise().query('SELECT * FROM content WHERE content_id = ?', [id]);

        res.render('dashboard/newTopic.ejs', {data:data[0][0], contentTags: tags});
        // res.render('dashboard/newTopic.ejs', {data:data[0][0], contentTags: tags, imgName: imgName});
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

        console.log(data, 'data');

        if(req.Errmsg) {
            req.flash('multerErrMsg', 'Img is not saved!!!');
            res.redirect('/qadmin');
        }

        else {

            con.promise().query(`UPDATE content
            INNER JOIN content_tags ON (content_tags.content_id = content.content_id)
            INNER JOIN tags ON (content_tags.tag_id = tags.tag_id)
            SET content.header = ?, content.clickbait = ?,content.article = ?,content.img = ?, tags.tag = ?
            WHERE content.content_id = ?;`,
            [
                data.heading,
                data.clickbait,
                data.article,
                data.imgName,
                JSON.stringify(data.tags),
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
