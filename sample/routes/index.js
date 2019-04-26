var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.session)
  res.render('index', { title: 'Bookstore' });
});

router.get('/profile', function(req, res, next) {
  res.render('profile');
});

router.get('/admin', function(req, res, next) {
  res.render('admin');
});


module.exports = router;
