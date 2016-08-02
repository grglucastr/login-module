var express = require('express');
var authRouter = express.Router();
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/appLoginDB');
var passport = require('passport');

/*
authRouter.use(function(req, res, next){
	if(!req.user){
		res.redirect('/');
	}
	next();
});
*/

authRouter.post('/signUp', function(req, res){
	console.log(req.body);

	var collection = db.collection('users');
	var user = {
		username: req.body.username,
		password:req.body.password
	};

	collection.insert(user, function(err, results){
		req.login(results, function(){
			res.redirect('/auth/profile');
		});
	});
});

authRouter.post('/signIn', passport.authenticate('local', {failureRedirect: '/'}), function(req, res){
	res.redirect('/auth/profile');
});

authRouter.route('/profile').all(function(req, res, next){
	if(!req.user){
		res.redirect('/');
	}
	next();
}).get(function(req, res){
	res.render('profile', {title:req.user.username + ' - Profile', user:req.user})
});

authRouter.route('/signout').all(function(req, res, next){
	if(!req.user){
		res.redirect('/');
	}
	next();
}).get(function(req, res){
	req.logout();
	req.session.destroy();
	res.redirect('/');
});

module.exports = authRouter;
