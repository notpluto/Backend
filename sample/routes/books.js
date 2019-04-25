var express = require('express');
var router = express.Router();
var Book = require('../models/Book')
var Author = require('../models/author')


router.get('/', (req, res, next) => {
	Book.find({}).populate('author').exec((err, book) => {
		if(err) return next(err);
		res.render('bookMain', {book});
	})
})

// router.get('/books', function(req, res, next) {
//   res.render('addBook');
// });

router.get('/new', function(req, res, next) {
	Author.find({}, 'name', (err, authors) => {
		if(err) return next(err);
		// console.log(authors._id)
  	res.render('addBook', {authors});
	})
});

router.get('/:id', (req, res, next) => {
	var id= req.params.id;
	Book.find({_id: id}).populate('author', "name").exec((err, book) => {
		if(err) return next(err);
		res.render('bookDetails', {book})
	})
})

// Add books
router.post('/' , function(req, res, next) {
	var data = req.body
	Book.create(data, (err, book) => {
		if(err) return next(err);
		Author.findByIdAndUpdate(book.author, {$push: {books: book._id}}, 
		{new: true}, (err, author) => {
				if(err) return console.log(err)
					res.redirect('/')
			})
	})
})

// Update books

router.get('/:id/edit', (req, res, next) => {
	var id = req.params.id
	Book.findById(req.params.id, (err, book) => {
		if(err) return next(err);
		Author.find({}, "name", (err, authors) => {
			res.render('editBook', {book, authors})
		})
		
	})
})

// req.body is only used in case of POST requests
router.post('/:id/update', (req, res, next) => {
	var data = req.body;
	console.log(req.params.id)
	var id = req.params.id;
	Book.findByIdAndUpdate(id, data, {upsert: true, new: true}, (err, data) => {
		if(err) return console.log(err);
		res.redirect('/')
	})
})

// Delete Books
router.get('/:id/delete', (req, res, next) => {
	Book.findByIdAndDelete((req.params.id), (err, data) => {
		if(err) return console.log(err);
		res.redirect('/')
	})
})

module.exports = router;



