var Book = require('../models/Book')
var Author = require('../models/author')

module.exports = {

	// Show books
	book_list: (req, res, next) => {
		// if(req.session && req.session.userId) {
			Book.find({}).populate('author').exec((err, book) => {
				if(err) return next(err);
				res.render('bookMain', {book});
			})	
		// }
		// else {
		// res.redirect('/users/login')
		// }
	},

	// Render new books page
	book_add_new_show: (req, res, next) => {
		Author.find({}, 'name', (err, authors) => {
			if(err) return next(err);
			// console.log(authors._id)
  		res.render('addBook', {authors});
		})
	},

	// Book details
	book_details: (req, res, next) => {
		var id= req.params.id;
		Book.find({_id: id}).populate('author', "name").exec((err, book) => {
			if(err) return next(err);
			res.render('bookDetails', {book})
		})
	},

	// Add books
	book_add_new: (req, res, next) => {
		var data = req.body
		Book.create(data, (err, book) => {
			if(err) return next(err);
			Author.findByIdAndUpdate(book.author, {$push: {books: book._id}}, 
			{new: true}, (err, author) => {
				if(err) return console.log(err)
					res.redirect('/books')
				})
		})
	},

	// Render edit page for books
	book_details_edit: (req, res, next) => {
		var id = req.params.id
		Book.findById(req.params.id, (err, book) => {
			if(err) return next(err);
			Author.find({}, "name", (err, authors) => {
			res.render('editBook', {book, authors})
			})
		})
	},

	// Update books
	book_details_update: (req,res, next) => {
		var data = req.body;
		var id = req.params.id;
		Book.findByIdAndUpdate(id, data, {upsert: true, new: true}, (err, data) => {
			if(err) return console.log(err);
			res.redirect('/books')
		})
	},

	// Remove books
	book_remove: (req, res, next) => {
		Book.findByIdAndDelete((req.params.id), (err, data) => {
			if(err) return console.log(err);
			res.redirect('/books')
		})
	}, 
}