var mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		unique: true,
		ref: 'User'
	},
	products: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product'
	}],

})

var Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;