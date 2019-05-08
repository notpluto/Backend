const passport = require('passport');
const LocalStrategy = require('passport-local');
var GitHubStrategy = require('passport-github').Strategy;
var User = require('../models/User');
var modules = require('../modules/database');
var bcrypt = require('bcrypt');
const keys = require('./keys');

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

passport.use(new GitHubStrategy({
	// options for google strategy
	callbackURL: '/auth/github/callback',
	clientID: keys.github.clientID,
	clientSecret: keys.github.clientSecret
	}, (accessToken, refreshToken, profile, done) => {
	// passport callback function
	//check for existing author from profile into local database
	console.log(profile)
	User.findOne({email: profile.emails[0].value}, (err, currentUser) => {
		if(currentUser) {
			// console.log('this author already exist' + currentUser)
			console.log(currentUser._id)
			done(null, currentUser)
		}
		else {
			new User({
				name: profile.displayName,
				githubId: profile.id,
				email: profile.emails[0].value,
				photo: profile.photos[0].value
			}).save().then((newUser) => {
				console.log('new User created:' + newUser)
				done(null, newUser)
			})
		}
		})
	}
	)
)



passport.serializeUser((user, done) => {
  	done(null, user.id);
	});

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(null, user)
	})
});