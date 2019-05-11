var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');


/* GET users listing. */
router.get('/', (req, res, next) => {
  res.json({
  	message: "Welcome to the API"
  });
});

router.post('/users', verifyToken, (req, res, next) => {
	jwt.verify(req.token, 'secretkey', (err, decoded) => {
		if(err) {
			res.sendStatus(403)
		} else {
			res.json({
				message: 'You have been verified',
				decoded
			});
		}
	})
})

router.post('/login', (req, res, next) => {
	// test user
	const user = {
		username: "srijan",
		email: "srijan.kpr@live.in"
	}

	jwt.sign({user}, 'secretkey', (err, token) => {
		res.json({token})
	})
})

// Verify Token Middleware
function verifyToken(req, res, next){
	// getting auth header value
	const headerValue = req.headers['token'];
	// check if header value is undefined
	if(typeof headerValue !== 'undefined'){
		// split at space
		const Value = headerValue.split(' ')[1];
		// Get token from array
		// const headerToken = Value[1];
		// set token
		req.token = Value;
		next()
	} else {
		res.sendStatus(403)
	}

}
module.exports = router;
