var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var authorSchema = new Schema({
	name: String,
	age: Number,
	email: String,
	books: [{
		type: Schema.Types.ObjectId,
		ref: 'Book'
	}],
});

var Author = mongoose.model('Author', authorSchema)

module.exports = Author;