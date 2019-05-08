const mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		index: {
			unique: true
		}
	},
	strategies: [String],
	local:{
		name: {
			type: String,
			minlength: 8,
			maxlength: 15
		},
		password:{
			type: String,
			minlength: 8,
		},
		photo: String
	},
	github:{
		name: String,
		photo: String
	},
	google:{
		name: String,
		photo: String 
	}
});


// password hashing middleware 
userSchema.pre('save', function(next) { 
	// only hash the password if it has been modified (or is new)
	var user = this;
	if(!user.isModified('local.password')) return next();
	// generate a salt
	bcrypt.genSalt(10, function(err, salt) {
		// console.log('inside gensalt');
		if(err) return next(err);
		// hash the password along with our new salt
		bcrypt.hash(user.local.password, salt, function(err, hash) {
			if(err) return next(err);
			// console.log(hash, 'hash password');
			// override the cleartext password with the hashed one
			user.local.password = hash;
			// console.log('inside pre save', this);
			next()
		})
	})
})

// password verification
userSchema.methods.comparePassword = function(candidatePassword, cb) {
	// console.log('inside verification')
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
  };

var User = mongoose.model('User', userSchema)

module.exports = User;
