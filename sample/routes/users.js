var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
var authController = require('../controllers/authController');


/* GET users listing. */
router.get('/', authController.isUserLogged, userController.user_list);

router.get('/info', userController.user_info);

router.get('/register', userController.user_register_page)

router.get('/login', userController.user_login_page)

router.post('/register', userController.user_new_register)

router.post('/login', userController.user_login)

router.get('/logout', userController.user_logout)

router.get('/:id/delete', userController.user_remove)

module.exports = router;
