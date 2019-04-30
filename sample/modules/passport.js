const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const keys = require('./keys');
const Author = require('../models/author');

passport.use(
	new GoogleStrategy({
	// options for google strategy
	callbackURL: '/auth/google/redirect',
	clientID: keys.google.consumerKey,
	clientSecret: keys.google.consumerSecret
	}, (accessToken, refreshToken, profile, done) => {
	// passport callback function
	new Author({
		name: profile.displayName,
		googleId: profile.id,
		email: profile.emails.map(ele => ele.value).join(''),
		photo: profile.photos.map(ele => ele.value).join(' ')
	}).save().then((newUser) => {
		console.log('new Author created:' + newUser)
		done(null, newUser)
	})
	//check for existing author from profile into local database
	Author.findOne({email: profile.emails.map(ele => ele.value).join('')}, (err, Author) => {
	// 	console.log(Author)
	// 	if(err) return next(err)
	// 	if(author) return author
	// 	else {
	// 		Author.create(profile, (err, Author) => {
	// 			if(err) return next(err)
	// 				res.redirect('/author')
	// 		})
	// 	}
	// })
	//if yes
		// retutn author //done(null, author)
	// if no
		// creatge an author with fields from profile
	// return done(null, created author)
	// return done(null, Author)
	// console.log(author)
	// next()
		})
	}
	)
)

// passport.serializeUser()

//passport.deserializeUser 