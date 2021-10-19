const { response } = require('express');
const db = require('../config/dataBase');
const custom = require('../config/custom');

exports.getData = async (req, res) => {

    const con = db.getCon()
    const data = await con.promise().query('SELECT * FROM admin_u');

    res.render('dashboard/adminManage.ejs', {data: data[0]});
}

exports.newTopic = async (req, res) => {

    res.render('dashboard/newTopic.ejs');
    
}

exports.myTopic = async (req, res) => {
    
    const con = db.getCon()
    const data = await con.promise().query('SELECT * FROM content WHERE user_id = ?', [req.user.admin_id]);
    res.render('dashboard/myTopic.ejs', {data:data[0]});
}

exports.comments = async (req, res) => {

    res.render('dashboard/comments.ejs');
}


exports.deleteData = (req, res) => {

    const con = db.getCon();

    const data = req.body;

    if(req.params.id == req.user.admin_id || data.admin == 'on') {
        res.send('false');
    }
    else {
        con.promise().query('DELETE FROM admin_u WHERE admin_id = ?', [req.params.id])

        .then(response => {
        
        con.promise().query('SELECT * FROM admin_u')
        .then(data => {
            
            res.render('dashboard/adminManage.ejs', {data: data[0]});
        });
    
        }).catch(err => {
            throw err.message;
        });

    }
}


exports.updateData = (req, res) => {
    const con = db.getCon();
    const data = req.body;
    const inputData = data.inputData;
    const tableData = data.tableData;

    if(req.params.id == req.user.admin_id && ((tableData.confrm == true && inputData.confrm != 'on') || (tableData.admin == true && inputData.admin != 'on'))) {
        res.send('false');

    }

    else if(req.params.id != req.user.admin_id && tableData.admin == true) {
        res.send('false');
    }

    else {
        inputData.confrm = custom.convertCheckBoxConfrm(inputData);
        inputData.admin = custom.convertCheckBoxAdmin(inputData);

        con.promise().query(`UPDATE admin_u SET admin_name = ? , admin_surname = ?, admin_mail = ?,
        time_reg = ?, confirmed = ?, superAdmin = ? WHERE admin_id = ? `,
        [
            inputData.name,
            inputData.lastName,
            inputData.mail,
            inputData.time,
            inputData.confrm,
            inputData.admin,
            req.params.id
        ]
        ).then(() => {
            con.promise().query('SELECT * FROM admin_u')
            .then(data => {
                
                res.render('dashboard/adminManage.ejs', {data: data[0]});
            });
        }).catch((err) => {throw err.message});
    }

}