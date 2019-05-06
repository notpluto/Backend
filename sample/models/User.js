var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

// Defining schema or properties required for a user
var userSchema = new mongoose.Schema({
	name: {
		type:String,
		required: true,
		minlength: 8,
		maxlength: 15
	},
	email: { 
		type: String,
		required: true,
		index: {
			unique: true
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
	},
	cartId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Cart'
	}
});

// password hashing middleware 
userSchema.pre('save', function(next) { 
	// console.log('inside pre save');
	// only hash the password if it has been modified (or is new)
	var user = this;
	if(!user.isModified('password')) return next();
	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		// console.log('inside gensalt');
		if(err) return next(err);
		// hash the password along with our new salt
		bcrypt.hash(user.password, salt, function(err, hash) {
			if(err) return next(err);
			// console.log(hash, 'hash password');
			// override the cleartext password with the hashed one
			user.password = hash;
			next()
		})
	})
})

// password verification
userSchema.methods.comparePassword = function(candidatePassword, cb) {
	console.log('inside verification')
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
  };


var User = mongoose.model('User', userSchema);

module.exports = User;

