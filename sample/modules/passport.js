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
	//check for existing author from profile into local database
	Author.findOne({email: profile.emails.map(ele => ele.value).join('')}, (err, currentAuthor) => {
		if(currentAuthor) {
			// console.log('this author already exist' + currentAuthor)
			console.log(currentAuthor._id)
			done(null, currentAuthor)
		}
		else {
			new Author({
				name: profile.displayName,
				googleId: profile.id,
				email: profile.emails.map(ele => ele.value).join(''),
				photo: profile.photos.map(ele => ele.value).join(' ')
			}).save().then((newAuthor) => {
				console.log('new Author created:' + newAuthor)
				done(null, newAuthor)
			})
		}
		})
	}
	)
)

// passport.serializeUser()
// serializeUser determines which data of the user object should be stored in the session. The result of the serializeUser method is attached to the session as req.session.passport.user = {}.
passport.serializeUser((author, done) => {
	// console.log(author._id)
  done(null, author.id);
});

//passport.deserializeUser 
// The first argument of deserializeUser corresponds to the key of the user object that was given to the done function above. This key is matched with the in memory array / database or any data resource.
passport.deserializeUser((id, done) => {
	Author.findById(id, (err, author) => {
		done(null, author)
	})
});
