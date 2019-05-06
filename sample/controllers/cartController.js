var Book = require('../models/Book')
var Author = require('../models/author')
var Product = require('../models/Product')
var Cart = require('../models/Cart')


module.exports = {

	show_cart: (req, res, next) => {
	Book.findById(req.params.id, (err, book) => {
		// console.log(book, 'c2')
		console.log(book)
			if(err) return next(err);
				res.render('product', {book})
		})
	},

	add_to_cart: (req, res, next) => {
		console.log(req.body, 'add cart')	
		Product.findOne({bookId: req.params.id}, (err, product) => {
			if(product){
				console.log("book exists")
				Product.findOneAndUpdate({_id: product._id}, {$inc: {qunatity: req.body.qunatity}}, (err, product) => {
					console.log(product, 'products......')
					 res.redirect('/users')
				})
			}
			else {
				Product.create((req.body), (err,product) => {
					console.log(req.user)
					if(err) return next(err)
					Cart.findOneAndUpdate({_id: req.user.cartId}, {$push: {products: product._id}}, {new: true}, (err, cart) =>{
						console.log(req.user.cartId)
						console.log('added to cart')
						res.redirect('/users')
					})
				})
			}
		})
	},

	show_user_cart: (req, res, next) => {
		Cart.find({}).populate('products').exec((err, cart) => {
			if(err) console.log(err)
				console.log(cart);
				// res.send(cart)
				res.json(cart)
		})
	},



}
