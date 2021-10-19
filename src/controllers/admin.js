let db = require('../config/dataBase');

const custom = require('../config/custom');

exports.getAdmin = (req, res) => {

    // if(!req.user.superAdmin) {
    //     res.render('admin', {name: req.user.admin_name});
    // }

    // else {
    //     res.redirect('/qadmin');
    // }

    res.redirect('/qadmin');

}

exports.getFullAccesAdmin = async (req, res) => {

    // const con = db.getCon()
    // const data = await con.promise().query('SELECT * FROM admin_u');

    console.log(req.user.superAdmin);
    const data = req.user.superAdmin;

    res.render('fullAdmin', {data:data}); 

    // if(req.user.superAdmin) {
    //     res.render('fullAdmin', {data:data}); 
    // }

    // else {
    //     res.redirect('/admin');
    // }
    
}

exports.userAccess = (req, res, next) => {
        if (req.isAuthenticated())
            return next();
        else
            res.redirect('/login')
}

exports.dashboardLogout = (req,res) => {
    req.logout();
    res.redirect('/login');
}