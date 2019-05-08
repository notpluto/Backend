const LocalStrategy = require('passport-local')
var User = require('../models/User');
var modules = require('../modules/database');
var bcrypt = require('bcrypt');

module.exports = function(passport){

	passport.use(new LocalStrategy({usernameField: 'email'},
		function(email, password, done){
		console.log('inside strategy', email);
		// match username
		// let query={email:email};
		User.findOne({email: req.body.email}, (err, user) => {
			if(err) console.log(err)
				if(!user){
					return done(null, false, {message: 'User not found'})
				}
				// match password 
				bcrypt.compare(req.body.password, user.local.password, (err, result) => {
					if(err) console.log(err)
						if(result){
							console.log(result)
							return done(null, user)
					}
					else{
						return done(null, false, {message: 'Password incorrect'})
					}
				})

		})
	}))

	passport.serializeUser((user, done) => {
  	done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		Author.findById(id, (err, user) => {
			done(null, user)
		})
	});

}