var express = require('express');
var router = express.Router();
var User = require('../models/User')
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

/* GET users listing. */
router.get('/', function(req, res, next) {
	User.find({}, (err, user) => {
		if(err) return next(err);
  	res.render('userMain', {user});
	})
});

router.get('/info', function(req, res, next) {
  res.render('info');
});

router.get('/register', function(req, res, next) {
	res.render('addUser')
})

router.get('/login', function(req, res, next) {
	res.render('loginUser')
})


// Creating Users 
router.post('/register', (req, res, next) => {
	var data = req.body;
	bcrypt.hash(req.body.password, SALT_WORK_FACTOR, function (err, hash) {
		User.create(data, (err, user) => {
			console.log(user)
			if(err) return next(err);
			res.redirect('/')
		})
	})
})

// User Login
router.post('/login', (req,res,next) => {
	User.findOne({ email: req.body.email }, (err, user) => {
		if(err) res.status(500).redirect('/users/login')
		if(!user) res.status(400).send('User not found')
			else {
				bcrypt.compare(req.body.password, user.password, function(err, result) {
					if(result === true) {
						console.log(result);
						req.session.userId = user._id;
						res.redirect('/users')
					}
					else {
						next(err)
						res.send('incorrect password');
					}
				})
			}
	})
})

// Logout Users
router.get('/logout', (req, res, next) => {
	req.session.destroy(function(err) {
		if(err) return next(err);
		res.redirect('/users/login')
	})
})

// Delete Users
router.get('/:id/delete', (req, res, next) => {
	User.findByIdAndDelete((req.params.id), (err, data) => {
		if(err) return console.log(err);
		res.redirect('/users')
	})
})


module.exports = router;
