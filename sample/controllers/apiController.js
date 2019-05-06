var User = require('../models/User')
var Author = require('../models/author')
var Book = require('../models/Book')

module.exports = {

	main_api: (req, res, next) => {
		res.send('You have reached the Bookstore API page')
	},

	show_books: (req, res, next) => {
		Book.find({}, (err, books) => {
			if(err) next(err)
				res.json(books)
		})	
	},

	show_authors: (req, res, next) => {
		Author.find({}, (err, authors) => {
			if(err) next(err)
				res.json(authors)
		})
	},

	show_users: (req, res, next) => {
		User.find({}, (err, users) => {
			if(err) next(err)
				res.json(users)
		})
	},

}



