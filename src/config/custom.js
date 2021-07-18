let bcrypt = require('bcrypt');


module.exports = {
    saltAndHash: function(password, rounds) {
        return new Promise((res, rej) => {
           
            bcrypt.hash(password, rounds, (err, hash) => {
                if(err) rej(err);
                else {
                    res(hash);
                }
            });

        });
    },

    compare: (password, hash) => {
        return new Promise((res,rej) => {
            bcrypt.compare(password, hash, (err, same) => {
                if(err) rej(err);
                else {
                    res(same);
                }
                
            });
        });
    },

    comparee: (password, hash) => {
        bcrypt.compare(password, hash, (err, same) => {
            if(err) console.error(err);
            else {
                return same;
            }
        });
    },

    mailValidation: function() {
        
    }
}