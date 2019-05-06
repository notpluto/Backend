var User = require('../models/User');
var Author = require('../models/author');

module.exports = {

	isUserLogged: (req, res, next) => {
		if(req.session && req.session.userId) {
			User.findById(req.session.userId, (err, user) => {
				if(err) console.log(err)
				req.user = user;
				res.locals.user = user;
				next()
			})
		}
		else {
			res.redirect('/users/login')
		}
	},

	isAuthorLogged: (req, res, next) => {
		if(req.session.passport && req.session.passport.user) {
			Author.findById(req.session.passport.user, (err, author) => {
				if(err) console.log(err)
				req.author = author;
				res.locals.author = author;
				next()
			})
		}
		else {
			res.redirect('/auth/google')
		}
	},

	sessions: (req, res, next) => {
		if(req.session && req.session.userId){
			User.findById(req.session.userId, (err, user) => {
				req.user = user;
				res.locals.user = user;
				next();
			});
		}
		else{
			req.user = null;
			res.locals.user = null;
			next()
		}
	},

	authorSession: (req, res, next) => {
		if(req.session.passport && req.session.passport.user) {
			Author.findById(req.session.passport.user).populate('books').exec((err, author) => {
				req.author = author;
				res.locals.author = author;
				next()
			});
		}
		else{
			req.author = null;
			res.locals.author = null;
			next()
		}
	},

	cartSession: (req, res, next) => {
		if(req.session.cart) {
			Cart.findById(req.session.cart, (err, cart) => {
				req.cart = cart;
				res.locals.cart = cart;
				next()
			});
		}
		else {
			req.cart = null;
			res.locals.cart = null;
		}
	}

}