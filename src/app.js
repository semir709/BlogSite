const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');

app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));
app.use(flash());

app.use((req,res, next)=> {
    res.locals.succes_msg = req.flash('msgSuccess');
    next();
});

app.use('/', require('./routes/routes'));


app.listen(3000);