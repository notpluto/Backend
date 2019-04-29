var User = require('../models/User')
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

module.exports = {

	// Get users
	user_list: (req, res, next) => {
		User.find({}, (err, users) => {
			if(err) return next(err);
			// console.log(req.user.name, 'inside controller')
  		res.render('userMain', {users});
		})
	},

	user_info: (req, res, next) => {
		res.render('info')
	},

	// Render registration page
	user_register_page: (req, res, next) => {
		res.render('signUp')
	},

	// Render login page
	user_login_page: (req, res, next) => {
		// console.log(req.flash('error'))
		var error = req.flash('error');
		res.render('loginUser', {message: error.length ? error[0]: null})
	},

	// POST request on register, create new users
	user_new_register: (req, res, next) => {
		var data = req.body;
		bcrypt.hash(req.body.password, SALT_WORK_FACTOR, function (err, hash) {
		User.create(data, (err, user) => {
			console.log(user)
			if(err) return next(err);
			res.redirect('/')
		})
	})
	},

	user_login: (req, res, next) => {
		User.findOne({ email: req.body.email }, (err, user) => {
		if(err) res.status(500).redirect('/users/login')
		if(!user) {
			req.flash('error', 'Invalid Email')
			res.status(400).redirect('/users/login');
		}
		else {
			bcrypt.compare(req.body.password, user.password, function(err, result) {
				if(result) {
					console.log(result);
					req.session.userId = user._id;
					res.redirect('/users')
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
		req.session.destroy(function(err) {
			if(err) return next(err);
			res.redirect('/users/login')
		})
	},

	user_remove: (req, res, next) => {
		User.findByIdAndDelete((req.params.id), (err, data) => {
			if(err) return console.log(err);
			res.redirect('/users')
		})
	},

}