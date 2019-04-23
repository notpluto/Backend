var express = require('express');
var router = express.Router();
var Book = require('../models/Book')

router.get('/', function(req, res, next) {
	Book.find({}, (err, book) => {
		if(err) return next(err);
  		res.render('bookMain', {book});
	})
});

router.get('/books', function(req, res, next) {
  res.render('addBook');
});

// Add books
router.post('/books' , function(req, res, next) {
	var data = req.body
	// console.log(req.body)
	Book.create(data, (err, Book) => {
		if(err) return next(err);
		res.redirect('/')
	})
})

// Update books
router.get('/books/:id/edit', (req, res, next) => {
	// var data = req.body
	Book.findById((req.params.id), (err, book) => {
		if(err) return console.log(err);
		res.render('editBook', {book})
	})
})

// req.body is only used in case of POST requests
router.post('/books/:id/update', (req, res, next) => {
	var data = req.body;
	console.log(req.params.id)
	var id = req.params.id;
	Book.findByIdAndUpdate(id, data, {upsert: true, new: true}, (err, data) => {
		if(err) return console.log(err);
		res.redirect('/')
	})
})

// Delete Books
router.get('/books/:id/delete', (req, res, next) => {
	Book.findByIdAndDelete((req.params.id), (err, data) => {
		if(err) return console.log(err);
		res.redirect('/')
	})
})

module.exports = router;



