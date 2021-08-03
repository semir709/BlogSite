const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

require('dotenv').config();

app = express();

require('./config/passport')(passport); //

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
    secret: process.env.SECRET, 
    resave: true,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req,res, next)=> {
    res.locals.succes_msg = req.flash('msgSuccess');
    next();
});

app.use('/', require('./routes/routes'));


app.listen(3000);