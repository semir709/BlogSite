const { response } = require('express');
let mysql = require('mysql');


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
    sendAdminData: function(con, name, lastName, mail, password, about) {

        return new Promise((result,reject) => {
            con.query('INSERT INTO admin_u VALUES (0,?,?,?,?,?)', [
                name,
                lastName,
                mail,
                password,
                about
            ], (err,res) => {
                if(err) return reject(err);

                result(res);
                
            });

            
        });
        
    },

    sendAmdinDataAsy: async function(con, name, lastName, mail, password, about) {
       let val;
        try {
            val =  await con.query('INSERT INTO admin_u VALUES (0,?,?,?,?,?)', [
                name,
                lastName,
                mail,
                password,
                about
            ]);
        }
        catch(err) {
            if(err) console.error(err);
        }

        return Promise.resolve(val);
        
    },
    getMail: function (con, email) {
        return new Promise ((respone, reject) => {
            con.query('SELECT * FROM admin_u WHERE admin_mail = ?', [
                email
            ], (err,res) => {
                if(err) return reject('Mail is not valid');
                else {
                    respone(res);    
                }
                
            });
        });
    }

    
}