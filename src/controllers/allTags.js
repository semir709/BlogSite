const db = require('../config/dataBase');


module.exports = {
    delete: async function(req, res) {
        let id = req.body.id;
        
        const con = db.getCon();

        try {
            await con.promise().query('DELETE FROM all_tags WHERE all_tags.tag_id = ?', [id]).catch(err => {
                return err;
            });

            let data = await con.promise().query('SELECT * FROM all_tags ORDER BY all_tags.tag_id DESC').catch(err => {
                return err;
            });
            
            res.render('dashboard/allTags.ejs', {data:data[0]});
            
        }catch(err) {
            console.log(err);
        }

    },
    update: async function(req, res) {
        const id = req.body.id;
        const value = req.body.value;

        console.log(id, 'id');console.log(value, 'v');
        
        const con = db.getCon();

        try {
            await con.promise().query('UPDATE all_tags SET tag = ? WHERE tag_id = ?', [value,id]).catch(err => {
                return err;
            });
            
            const data = await con.promise().query('SELECT * FROM all_tags ORDER BY all_tags.tag_id DESC').catch(err => {
                return err;
            });


            // res.render('dashboard/allTags.ejs', {data:data[0]});
            res.send('The tag is updated')
            
        }catch(err) {
            console.log(err);
        }

    }
}