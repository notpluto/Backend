var express = require('express');
var router = express.Router();
var bookController = require('../controllers/bookController')
var authController = require('../controllers/authController');

router.get('/', authController.isUserLogged, bookController.book_list)

router.get('/new', authController.isUserLogged, bookController.book_add_new_show);

router.get('/:id', authController.isUserLogged, bookController.book_details);

router.post('/', bookController.book_add_new);

router.get('/:id/edit', authController.isUserLogged, bookController.book_details_edit);

// req.body is only used in case of POST requests
router.post('/:id/update',bookController.book_details_update);

router.get('/:id/delete', authController.isUserLogged, bookController.book_remove);

module.exports = router;



