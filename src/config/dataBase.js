const { response } = require('express');
let mysql = require('mysql2');


module.exports = {
    getCon: function () {
        let con = mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root123',
            database:'blogdb'
        });

        con.connect((err) => {
            if (err) throw err.message;
            
        });

        return con;
    },
    storeAdminData: function(con, name, lastName, mail, password, about) {
        
        con.query('INSERT INTO admin_u VALUES (0,?,?,?,?,?)', [
            name,
            lastName,
            mail,
            password,
            about
        ],(err, res) => {
            if(err) console.error(err);
        });

    },
    getMail: function (con, email) {
        return new Promise ((respone, reject) => {
            con.query('SELECT * FROM admin_u WHERE admin_mail = ?', [
                email
            ], (err,res) => {
                if(err) return reject('error in query for selecting mail');
                else {
                    respone(res);    
                }
                
            });
        });
    }

    
}