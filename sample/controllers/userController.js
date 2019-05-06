var User = require('../models/User')
var Cart = require('../models/Cart')
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

module.exports = {

	// Get users
	// user_list: (req, res, next) => {
	// 	// console.log(req.session);
	// 	Cart.find({}, (err, users) => {
	// 		if(err) return next(err);
	// 		// console.log(req.user.name, 'inside controller')
 //  		res.render('userMain', {users});
	// 	})
	// },

	show_user_cart: (req, res, next) => {
		Cart.findOne({})
		.populate({
			path:'products', 
			populate:
			[{
				path: 'bookId',
				populate:
				{
					path: 'author',
					model: 'Author'
				}
			}]
		})
		.exec((err, cart) => {
			if(err) console.log(err)
				console.log(cart);
				// res.send(cart)
				res.render('userMain', {cart})
				// res.json(cart)
		})
	},

	user_info: (req, res, next) => {
		res.render('info')
	},

	// Render registration page
	user_register_page: (req, res, next) => {
		var error = req.flash('error');
		res.render('signUp', {message: error.length ? error[0]: null})
	},

	// Render login page
	user_login_page: (req, res, next) => {
		// console.log(req.flash('error'))
		var error = req.flash('error');
		res.render('loginUser', {message: error.length ? error[0]: null})
	},

	// POST request on register, create new users
	user_new_register: (req, res, next) => {
		if(req.body.name.length < 8) {
			req.flash('error', 'Username must meet the required criteria')
			res.redirect('/users/register')
		}
		if(req.body.password.length < 8) {
			req.flash('error', 'Password must be atleast of 8 characters')
			res.redirect('/users/register')
		}
		var data = req.body;
		bcrypt.hash(req.body.password, SALT_WORK_FACTOR, function (err, hash) {
		User.create(data, (err, user) => {
			// console.log(user, err, 'c1')
			if(err) return next(err);
			Cart.create({userId: user._id}, (err, cart) => {
				if(err) return next(err);
				var objectToSave = {
					cartId: cart._id,
				}
				User.findByIdAndUpdate({_id: user._id}, objectToSave, {new: true}, (err, user)=> {
					console.log(cart, 'cart')
					console.log(user, 'user')
					console.log(req.session, 'session')
					req.session.userId =user._id
					res.redirect('/users/login')

				})
			})
		})
			// res.redirect('/users/login')
	})
	},

	user_login: (req, res, next) => {
		User.findOne({ email: req.body.email }, (err, user) => {
			console.log(req.session)
		if(err) res.status(500).redirect('/users/login')
		if(!user) {
			req.flash('error', 'Invalid Email')
			res.status(400).redirect('/users/login');
		}
		else {
			bcrypt.compare(req.body.password, user.password, function(err, result) {
				if(result) {
					// console.log(result);
					req.session.userId = user._id;
					res.redirect('/books')
				}
				else {
					// next(err)
					// res.send('incorrect password');
					req.flash('error', 'incorrect password')
					res.redirect('/users/login')
				}
			})
		}
		})
	},

	user_logout: (req, res, next) => {
		req.session.destroy();
		res.redirect('/users/login');
	},

	user_remove: (req, res, next) => {
		User.findByIdAndDelete((req.params.id), (err, data) => {
			if(err) return console.log(err);
			res.redirect('/users')
		})
	},

}