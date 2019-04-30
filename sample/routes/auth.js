const router = require('express').Router()
const passport = require('passport');

router.get('/', (req, res) => {
	res.send('Using Passport OAuth2')
})

// auth login
router.get('/login', (req, res) => {
	res.render('auth-login')
})

// auth logout
router.get('/logout', (req, res) => {
	// handle with passport
	res.send('logging out')
})

// auth with google (redirect)
// authenticating user using google strategy
router.get('/google', passport.authenticate('google', {
	// scope defines what we want to retrieve from user(ex: profile, email etc.)
	scope: ['profile', 'email']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
	// at this point we have a code from google which we autheticate for user profile
	res.send('you reached the callback URL')
  // passport.authenticate('google', { failureRedirect: '/login' }),
  // function(req, res) {
  //   res.redirect('/');
  });


module.exports = router;