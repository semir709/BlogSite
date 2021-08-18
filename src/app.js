const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const db = require('./config/dataBase');
const passport = require('passport');
const mySqlStore = require('express-mysql-session')(session);

require('dotenv').config();

app = express();

require('./config/passport')(passport); 

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/js', express.static('public/js'));
app.use('/css', express.static('public/css'));
app.use('/dashboard', express.static('views/dashboard'));


const sessionStore = new mySqlStore({
    host:'localhost',
    user:'root',
    password:'root123',
    database:'blogdb',
    createDatabaseTable: true,
    schema: {
        tableName:'sessiontb',
        columnNames:{
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }

});

app.use(session({
    secret: process.env.SECRET, 
    store:sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge:24 * 60 * 60 * 1000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req,res, next)=> {
    res.locals.succes_msg = req.flash('msgSuccess');
    res.locals.loginNoMsg_msg = req.flash('loginNoMail');
    res.locals.loginNoPass_msg = req.flash('loginNoPassword');
    next();
});

app.use('/', require('./routes/routes'));


app.listen(3000);