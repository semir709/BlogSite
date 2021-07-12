let express = require('express');
let router = express.Router();

let main = require('../controllers/main');
let accuont = require('../controllers/account');

router.get('/', main.main);
router.get('/login', accuont.login);
router.post('/login', accuont.loginPost);
router.get('/login/create', accuont.createAc);
router.post('/login/create', accuont.createAcPost);


module.exports = router;
