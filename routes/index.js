var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	var errorMessage = req.flash('error');
	var errorSignUpMessage = req.flash('errorSignUpMessage');

	res.render('index', {
		title: 'Login Module',
		errorLoginMessage: errorMessage,
		errorSignUpMessage: errorSignUpMessage
	});
});

module.exports = router;
