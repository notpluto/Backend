var mongoose = require('mongoose');

var Schema = mongoose.Schema;
// Created schema for blog
var blogSchema = new Schema({
	title: String,
	description: {
		type: String,
		required: true,
	},
	likes: {
		type: Number,
		default: 0,
	},
	author: String,
	created: Date,
	tags: [String],

});

var Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog;

// interaction of schema with mongodb happens using models
