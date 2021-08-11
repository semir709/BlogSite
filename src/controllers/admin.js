


exports.getAdmin = (req, res) => {

    if(!req.user.superAdmin) {
        res.render('admin', {name: req.user.admin_name});
    }

    else {
        res.redirect('/qadmin');
    }

}

exports.getFullAccesAdmin = (req, res) => {

    if(req.user.superAdmin) {
        res.render('fullAdmin');
    }

    else {
        res.redirect('/admin');
    }
    
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