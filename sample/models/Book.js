var mongoose = require('mongoose');

// Defining schema or properties required for a book
var bookSchema = new mongoose.Schema({
	title: String,
	description: {
		type: String,
		required: true,
	},
	likes:{
		type: Number,
		default: 0,
	},
	author: {type:String},
	created: Date,
	tags: [String],
})

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;