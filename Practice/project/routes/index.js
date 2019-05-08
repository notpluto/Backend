var express = require('express');
var router = express.Router();
var passport = require('passport')
var User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', 
	passport.authenticate('local', 
		{
		 failureRedirect: '/',
		 successRedirect: '/users'
		}
	)
)

router

module.exports = router;
