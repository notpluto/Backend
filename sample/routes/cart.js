var express = require('express');
var router = express.Router();
var cartController = require('../controllers/cartController');
var authController = require('../controllers/authController');

router.get('/', (req, res, next) => {
	res.send('Cart items')
})

router.get('/:id/additem', authController.isUserLogged, cartController.show_cart)

router.post('/:id/additem', authController.isUserLogged, cartController.add_to_cart)

router.get('/users/cart', cartController.show_user_cart)


module.exports = router;