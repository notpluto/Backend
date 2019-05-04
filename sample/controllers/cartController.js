var Book = require('../models/Book')
var Author = require('../models/author')

module.exports = {

	show_cart: (req, res, next) => {
	Book.findById(req.params.id, (err, book) => {
		// console.log(book, 'c2')
		console.log(book)
			if(err) return next(err);
				res.render('product', {book})
		})
	},

}
