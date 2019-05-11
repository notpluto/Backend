const passport = require('passport');
const LocalStrategy = require('passport-local');
var GitHubStrategy = require('passport-github').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
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
	// console.log(profile)
	User.findOne({email: profile.emails[0].value}, (err, currentUser) => {
		if(currentUser) {
			if(currentUser.strategies.includes(profile.provider)) {
				console.log(profile.provider, 'provider check')
				return done(null, currentUser)
			} else {
				User.findOneAndUpdate({email: profile.emails[0].value }, {
					$push: {strategies: profile.provider}, github: {
						name: profile.displayName,
						photo: profile.photos[0].value
					}
				}, {new: true}, (err, currentUser) => {
					if(err) return done(err);
					done(null, currentUser)
				})
			}
		}
		else {
			new User({
				github: {
						name: profile.displayName,
						photo: profile.photos[0].value
					},
				email: profile.emails[0].value,
				strategies: ['github']
			}).save().then((newUser) => {
				console.log('new User created:' + newUser)
				done(null, newUser)
			})
		}
		})
	}
	)
);

passport.use(new TwitterStrategy({
	// options for google strategy
	callbackURL: '/auth/twitter/callback',
	consumerKey: keys.twitter.clientID,
	userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true",
	consumerSecret: keys.twitter.clientSecret
	}, (accessToken, refreshToken, profile, done) => {
	// passport callback function
	//check for existing author from profile into local database
	console.log(profile)
	User.findOne({email: profile.emails[0].value}, (err, currentUser) => {
		if(currentUser) {
			if(currentUser.strategies.includes(profile.provider)) {
				console.log(profile.provider, 'check provider')
				return done(null, currentUser)
			} else {
				User.findOneAndUpdate({email: profile.emails[0].value }, {
					$push: {strategies: profile.provider}, twitter: {
						name: profile.displayName,
						photo: profile.photos[0].value
					}
				}, {new: true}, (err, currentUser) => {
					if(err) return done(err);
					done(null, currentUser)
				})
			}
		}
		else {
			new User({
				email: profile.emails[0].value,
				twitter: {
						name: profile.displayName,
						photo: profile.photos[0].value
					},
				strategies: ['twitter']
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