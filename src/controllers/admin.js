


exports.getAdmin = (req, res) => {
    res.render('admin', {name: req.user.admin_name});
    console.log(req.user);

}

exports.getFullAccesAdmin = (req, res) => {
    res.render('fullAdmin');
}

exports.userAccess = (req, res, next) => {
        if (req.isAuthenticated())
            return next();
        else
            res.redirect('/login')
}