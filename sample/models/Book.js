var mongoose = require('mongoose');

// Defining schema or properties required for a book
var bookSchema = new mongoose.Schema({
	title: String,
	description: {
		type: String,
		required: true,
	},
	pages:{
		type: Number,
		default: 0,
	},
	author: {
		type:mongoose.Schema.Types.ObjectId,
		ref: 'Author'
	},
	created: Date,
	tags: [String],
});

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;