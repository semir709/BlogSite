const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../config/dataBase');

const con = db.getCon();


module.exports = (passport) => {
    passport.use(
        new LocalStrategy({usernameField: 'email', passwordField: 'password'}, (email, password, done) => {
             
            con.promise().query('SELECT * FROM admin_u WHERE admin_mail = ?', [email])
            .then((result) => {
                console.log(result[0][0].admin_password, 'db');
                if(result[0].length == 0) {
                    return done(null, false, {message:'No user found'});
                }

                if(result[0][0].confirmed == 0) {
                    return done(null,false,{message:'Please wait you are not confirmed'});
                } 

                bcrypt.compare(password, result[0][0].admin_password, (err, same) => {
                    if(err) throw err;

                    if(same) {
                        return done(null, result[0][0]);
                    }
                    else {
                        return done(null, false, {message:'Opps!, Wrong password!!!'});
                    }
                });
            
            }).catch((err) => {
                return done(err);
            });



        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.admin_id);
      });

    passport.deserializeUser((id, done) => {
        con.promise().query('SELECT * FROM admin_u WHERE admin_id = ?', [id])
        .then((result) => {
            done(null, result[0][0]);
            
        });

    });

}

