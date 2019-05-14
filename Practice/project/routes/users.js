var express = require('express');
var router = express.Router();
var User = require('../models/User')
const bcrypt = require('bcrypt')
var SALT_WORK_FACTOR = 10;
var multer  = require('multer')
const nodemailer = require('nodemailer')


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

// Contact
router.get('/contact', (req, res, next) => {
	res.render('contact')
});

router.post('/contact', (req, res, next) => {
	console.log(req.body);

	async function main(){

	  // Generate test SMTP service account from ethereal.email
	  // Only needed if you don't have a real mail account for testing
	  let testAccount = await nodemailer.createTestAccount();

	let transporter = nodemailer.createTransport({
	    host: "smtp.ethereal.email",
	    port: 587,
	    secure: false, // true for 465, false for other ports
	    auth: {
	      user: testAccount.user, // generated ethereal user
	      pass: testAccount.pass // generated ethereal password
	    }
	  });

	  // send mail with defined transport object
	  let info = await transporter.sendMail({
	    from: '"Nodemail Contact 👻" <testAccount.user@ethereal.com>', // sender address
	    to: "muskrat@eay.jp", // list of receivers
	    subject: "Hello ✔", // Subject line
	    text: "Hello world?", // plain text body
	    html: "<b>Hello world?</b>" // html body
	  });

	  console.log("Message sent: %s", info.messageId);
	  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	  // Preview only available when sending through an Ethereal account
	  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
	}
		res.send('Email')
	main().catch(console.error);
})

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

// Logged In via twitter
router.get('/twitter', (req, res, next) => {
	res.send('You are logged in via Twitter')
})

// Logged In via Github
router.get('/github', (req, res, next) => {
	res.send('You are logged in via Github')
})



module.exports = router;
