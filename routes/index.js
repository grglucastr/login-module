var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	var errorMessage = req.flash('error');
	res.render('index', {
		title: 'Login Module',
		errorLoginMessage: errorMessage
	});
});

module.exports = router;
