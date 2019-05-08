const passport = require('passport');
const LocalStrategy = require('passport-local');
var User = require('../models/User');
var modules = require('../modules/database');
var bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
    'usernameField': 'email'
  },
  function(email, password, done) {
  	console.log(email, password);
  		User.findOne({email: email}, (err, user) => {
			if(err) console.log(err)
				if(!user){
					return done(null, false, {info: 'User not found'})
				}
				// match password 
				bcrypt.compare(password, user.local.password, (err, result) => {
					if(err) console.log(err)
						if(result){
							console.log(result)
							return done(null, user)
					}
					else{
						return done(null, false, {info: 'Password incorrect'})
					}
				})

		})
  }
));



passport.serializeUser((user, done) => {
  	done(null, user.id);
	});

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(null, user)
	})
});