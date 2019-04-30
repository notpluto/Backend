var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var authorSchema = new Schema({
	name: String,
	googleId: Number,
	email: {
		type: String,
		unique: true
	},
	photo: String,
	books: [{
		type: Schema.Types.ObjectId,
		ref: 'Book'
	}],
});

var Author = mongoose.model('Author', authorSchema)

module.exports = Author;