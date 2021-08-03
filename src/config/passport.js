const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../config/dataBase');

const con = db.getCon();


module.exports = (passport) => {
    passport.use(
        new LocalStrategy({usernameField: 'email', passwordField: 'password'}, (email, password, done) => {
             
            con.promise().query('SELECT * FROM admin_u WHERE admin_mail = ?', [email])
            .then((result) => {
                
                
                if(result[0].length == 0) {
                    return done(null, false, req.flash('loginNoMail', 'No user found'));
                }

                bcrypt.compare(password, result[0][0].admin_password, (err, same) => {
                    if(err) throw err;

                    if(same) {
                        return done(null, result[0][0]);
                    }
                    else {
                        return done(null, false, req.flash('loginNoPassword', 'Opps!, Wrong password!!!'));
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
        console.log(id);
        con.promise().query('SELECT * FROM admin_u WHERE admin_id = ?', [id])
        .then((result) => {
            done(null, result[0][0]);
            
        });

    });

}

