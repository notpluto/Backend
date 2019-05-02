var express = require('express');
var router = express.Router();
var bookController = require('../controllers/bookController')
var authController = require('../controllers/authController');

router.get('/', bookController.book_list)

router.get('/new', bookController.book_add_new_show);

router.get('/:id', bookController.book_details);

router.post('/', bookController.book_add_new);

router.get('/:id/edit', authController.isAuthorLogged, bookController.book_details_edit);

// req.body is only used in case of POST requests
router.post('/:id/update', authController.isAuthorLogged, bookController.book_details_update);

router.get('/:id/delete', authController.isAuthorLogged, bookController.book_remove);

module.exports = router;



