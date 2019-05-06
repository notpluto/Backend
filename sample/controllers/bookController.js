var Book = require('../models/Book')
var Author = require('../models/author')

module.exports = {

	// Show books
	book_list: (req, res, next) => {
		console.log(req.session)
		// console.log(req.author)
		Book.find({}).sort({created: -1}).populate('author').exec((err, book) => {
			// console.log(book)
			if(err) return next(err);
			res.render('bookMain', {book});
		})	
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
			{new: true}).populate('author', 'name').exec((err, author) => {
				if(err) return console.log(err)
					res.redirect('/author')
				})
		})
	},

	// Render edit page for books
	book_details_edit: (req, res, next) => {
		var id = req.params.id;
		Book.findById(req.params.id, (err, book) => {
			if(err) return next(err);
				if(req.author._id.equals(book.author)) {
					// console.log('Id match found')
					Author.find({}, "name", (err, authors) => {
					res.render('editBook', {book, authors})
				})	
			}
			else{
				res.status(401).redirect('/books')
			}
		})
	},

	// Update books
	book_details_update: (req,res, next) => {
		var data = req.body;
		var id = req.params.id;
		Book.findByIdAndUpdate(id, data, {upsert: true, new: true}, (err, data) => {
			if(err) return console.log(err);
			var update = req.flash('update')
			// req.flash('update', 'Book details successfully updated.')
			res.redirect('/author')
		})
	},

	// Remove books
	book_remove: (req, res, next) => {
		var id = req.params.id
		Book.findOne({_id: req.params.id}), (err, book) => {
			if(err) return next(err)
				if(req.author_id.equals(book.author)) {
					Book.findByIdAndDelete((req.params.id), (err, data) => {
						if(err) return console.log(err);
						res.redirect('/author')		
					})
				}
				else{
					res.status(401).redirect('/books')
				}
			}
		}, 
}