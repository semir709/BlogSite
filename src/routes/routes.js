let express = require('express');
let router = express.Router();
const passport = require('passport');

let main = require('../controllers/main');
let accuont = require('../controllers/account');
const admin = require('../controllers/admin');

router.get('/', main.main);
router.get('/login', accuont.login);
router.post('/login',accuont.loginAuth, accuont.loginPost);
router.get('/login/create', accuont.createAc);
router.post('/login/create', accuont.createAcPost);
router.get('/admin',admin.userAccess, admin.getAdmin);  
router.get('/qadmin', admin.userAccess, admin.getFullAccesAdmin); 
router.get('/dashboard', admin.dashboardLogout);
router.get('/qdashboard', admin.dashboardLogout);


module.exports = router;
