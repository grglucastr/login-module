var express = require('express');
var authRouter = express.Router();
var passport = require('passport');
var User = require('../models/user');

var router = function () {

	var authController = require('../controllers/authController.js')(User);
	var passportOptions = {
		successRedirect:'/auth/profile',
		failureRedirect: '/',
		failureFlash: true
	};

	/*
		authRouter.use(function(req, res, next){
			if(!req.user){
				res.redirect('/');
			}
			next();
		});
	*/
	authRouter.post('/signUp', authController.signUp);
	authRouter.post('/signIn', passport.authenticate('local', passportOptions));

	authRouter.route('/profile')
		.all(authController.authUserRequired)
		.get(authController.goProfile);

	authRouter.route('/signout')
		.all(authController.authUserRequired)
		.get(authController.signOut);

	authRouter.get('/auth/facebook', passport.authenticate('facebook'));
	authRouter.get('/auth/facebook/callback', passport.authenticate('facebook', passportOptions));

	return authRouter;
};

module.exports = router;
