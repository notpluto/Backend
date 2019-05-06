const router = require('express').Router()
const passport = require('passport');
var apiController = require('../controllers/apiController')

router.get('/', apiController.main_api)

router.get('/books', apiController.show_books)

router.get('/authors', apiController.show_authors)

router.get('/users', apiController.show_users)


module.exports = router;