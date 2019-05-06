var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.session.userId){
		res.redirect('/users')
	}
	else if(!req.session.passport.user) {
  	res.render('index', { title: 'Bookstore' });
	}
	else {
		res.redirect('/author')
	}
	console.log(req.session)
});

router.get('/profile', function(req, res, next) {
  res.render('profile');
});

router.get('/admin', function(req, res, next) {
  res.render('admin');
});

module.exports = router;
