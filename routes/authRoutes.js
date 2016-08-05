var express = require('express');
var authRouter = express.Router();
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/appLoginDB');
var passport = require('passport');

var router = function () {

	var authController = require('../controllers/authController.js')(db);
/*
	authRouter.use(function(req, res, next){
		if(!req.user){
			res.redirect('/');
		}
		next();
	});
*/
	authRouter.post('/signUp', authController.signUp);

	authRouter.post('/signIn', passport.authenticate('local',
													 {failureRedirect: '/'}), authController.signIn);

	authRouter.route('/profile')
			  .all(authController.authUserRequired)
			  .get(authController.goProfile);

	authRouter.route('/signout')
			  .all(authController.authUserRequired)
			  .get(authController.signOut);

	authRouter.get('/auth/facebook', passport.authenticate('facebook'));

	authRouter.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect: '/auth/profile',
			failureRedirect: '/'
		}));

	return authRouter;
};

module.exports = router;
