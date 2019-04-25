var express = require('express');
var router = express.Router();
var Author = require('../models/author');
var Book = require('../models/Book')

router.get('/add', (req,res, next) => {
	res.render('author');
})

// List Authors
router.get('/', (req, res, next) => {
	Author.find({}, (err, author) => {
		if(err) return next(err);
		res.render('authorMain', {author})
	})
})

router.get('/:id', (req, res, next) => {
	var id= req.params.id;
	Author.findById(id).populate('books').exec((err, author) => {
		if(err) return next(err);
		console.log(author);
		res.render('booksbyauthor', {author})
	})
})

// Add authors
router.post('/', (req, res, next) => {
	var data = req.body
	// console.log(req.body)
	Author.create(data, (err, Author) => {
		if(err) return next(err);
		res.redirect('/')
	})
})

// Remove Authors

router.get('/:id/delete', (req, res, next) => {
	Author.findByIdAndDelete((req.params.id), (err, data) => {
		if(err) return console.log(err);
		res.redirect('/')
	})
})



module.exports = router;
