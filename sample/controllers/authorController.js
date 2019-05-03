var Author = require('../models/author');
var Book = require('../models/Book')

module.exports = {

	// Render new author view
	author_create_new_page: (req, res, next) => {
		res.render('author');
	},

	// List author's book
	booksbyauthor_list: (req, res, next) => {
		console.log(req.session);
		console.log(req.author, "called now")
		Book.find({author: req.author._id}, (err, books) => {
			if(err) return next(err);
			console.log(books);
			res.render('authorMain', {books})
		})
	},

	// Author Details
	author_details: (req, res, next) => {
		var id = req.params.id;
		Author.findById(id).populate('books').exec((err, author) => {
			if(err) return next(err);
			// console.log(author);
			res.render('booksbyauthor', {author})
		})
	},

	// Create new authors
	author_create_new: (req, res, next) => {
		var data = req.body
		Author.create(data, (err, Author) => {
			if(err) return next(err);
			res.redirect('/')
		})
	},

	// Remove authors
	author_remove: (req, res, next) => {
		Author.findByIdAndDelete((req.params.id), (err, data) => {
			if(err) return console.log(err);
			res.redirect('/author')
		})
	},

}