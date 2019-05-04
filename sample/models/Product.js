var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var productSchema = new Schema({
	bookId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Book'
	},
	qunatity: {
		type: Number,
		default: 1
})

var Product = mongoose.model('Product', productSchema);

module.exports = Product;