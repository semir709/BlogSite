let express = require('express');
let router = express.Router();

let main = require('../controllers/main');
let accuont = require('../controllers/account');
const admin = require('../controllers/admin');

router.get('/', main.main);
router.get('/login', accuont.login);
router.post('/login', accuont.loginPost);
router.get('/login/create', accuont.createAc);
router.post('/login/create', accuont.createAcPost);
//router.get('/login/create/confrm/:token', accuont.getConfrm);
router.get('/admin',admin.userAccess, admin.getAdmin);  
router.get('/qadmin', admin.userAccess, admin.getFullAccesAdmin); 



module.exports = router;
