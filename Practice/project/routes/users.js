var express = require('express');
var router = express.Router();
var User = require('../models/User')
const bcrypt = require('bcrypt')
var SALT_WORK_FACTOR = 10;
var multer  = require('multer')

// Set storage
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
  	cb(null, './public/uploads')},
  filename: function(req, file, cb){
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Init upload
const upload = multer({
  storage:storage
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('user logged in');
});

router.get('/register', (req, res, next) => {
	res.render('register');
})

// Register User
router.post('/register', upload.single('photo'), (req, res, next) => {
	console.log(req.file)
	// console.log('inside post')
	if(req.body.name.length < 8) {
		req.flash('error', 'Username must meet the required criteria')
		 return res.redirect('/users/register')
	}
	if(req.body.password.length < 8) {
		req.flash('error', 'Password must be atleast of 8 characters')
		// console.log(req.flash())
		 return res.redirect('/users/register')
	}else {
		var newUser = {
			email: req.body.email,
			local: {
				name: req.body.name,
				password: req.body.password
			},
			strategies: ["local"],
			photo: req.file.filename
		}
		User.create(newUser, (err, user) => {

			console.log(err, user);
			res.redirect('/')
		})
	}
	}),




module.exports = router;
