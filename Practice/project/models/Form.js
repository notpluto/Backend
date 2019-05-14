const mongoose = require('mongoose');

var formSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	phone: {
		type: Number,
	},
	website: {
		type: String
	},
	message: {
		type: String
	}
})

var Form = mongoose.model('Form', formSchema)

module.exports = Form;