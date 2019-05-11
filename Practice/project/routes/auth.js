const router = require('express').Router()
const passport = require('passport');

router.get('/login', (req, res) => {
	res.send('using oauth')
})

// auth logout
// router.get('/logout', (req, res) => {
// 	// handle with passport
// 	req.logout();
// 	res.redirect('/');
// })

// authenticating user using github strategy
router.get('/github', passport.authenticate('github', {
	// scope defines what we want to retrieve from user(ex: profile, email etc.)
	scope: ['profile', 'email']
}));

router.get('/github/callback', passport.authenticate('github'), (req, res) => {
	// at this point we have a code from github which we autheticate for user profile
	res.redirect('/users/github')
  // passport.authenticate('github', { failureRedirect: '/login' }),
  // function(req, res) {
  //   res.redirect('/');
  });

router.get('/twitter', passport.authenticate('twitter', {
	scope: ['profile', 'email']
}));

router.get('/twitter/callback', passport.authenticate('twitter'), (req, res) => {
	res.redirect('/users/twitter')
})

module.exports = router;
