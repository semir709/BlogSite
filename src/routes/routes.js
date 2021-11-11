let express = require('express');
let router = express.Router();
const passport = require('passport');

let main = require('../controllers/main');
let accuont = require('../controllers/account');
const admin = require('../controllers/admin');
const dash = require('../controllers/dashboard');
const newTask = require('../controllers/newTask');
const myTopics = require('../controllers/myTopics');
const allTags = require('../controllers/allTags');

router.get('/', main.main);
router.get('/home', main.main);
router.get('/login', accuont.login);
router.post('/login',accuont.loginAuth, accuont.loginPost);
router.get('/login/create', accuont.createAc);
router.post('/login/create', accuont.createAcPost);
router.get('/admin',admin.userAccess, admin.getAdmin);  
router.get('/qadmin', admin.userAccess, admin.getFullAccesAdmin); 
router.get('/dashboard', admin.dashboardLogout);
router.get('/qdashboard', admin.dashboardLogout);
router.get('/dashboard/getData', dash.getData);
router.get('/dashboard/newTopic', dash.newTopic);
router.get('/dashboard/myTopic', dash.myTopic);
router.get('/dashboard/manageCom', dash.comments);
router.get('/dashboard/allTags',dash.tags);
router.delete('/dash/delete/:id', dash.deleteData);
router.post('/dash/update/:id', dash.updateData);
router.post('/dash/newTask/upload', newTask.storeImg);
router.delete('/myTask/delete', myTopics.delete);
router.delete('/allTags/delete', allTags.delete);
router.post('/allTags/update', allTags.update);
router.post('/myTask/update', myTopics.update);
router.post('/myTask/Finalupdate',myTopics.finalUpdateImg,myTopics.finalUpdateDb);
router.get('/category/:tag', main.category);
// router.get('/category/software', main.software);
// router.get('/category/network', main.network);
// router.get('category/code', main.code);
router.get('/about', main.aboutUs);
router.get('/page/', main.listingPages);


module.exports = router;
