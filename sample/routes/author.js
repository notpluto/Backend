var express = require('express');
var router = express.Router();
var authorController = require('../controllers/authorController')
var authController = require('../controllers/authController');

router.get('/add', authController.isAuthorLogged, authorController.author_create_new_page)

router.get('/', authController.isAuthorLogged, authorController.booksbyauthor_list)

router.get('/:id', authorController.author_details)

router.post('/', authorController.author_create_new)

router.get('/:id/delete', authorController.author_remove)

module.exports = router;
