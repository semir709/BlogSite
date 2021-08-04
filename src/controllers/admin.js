


exports.getAdmin = (req, res) => {
    res.render('admin');
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