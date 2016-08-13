var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../../../models/user');
var userService = require('../../../services/user')(User);

module.exports = function () {
	passport.use(new FacebookStrategy({
		clientID: '1441798922500688',
		clientSecret: '3956a34fc9dd813efba57421ae068072',
		callbackURL: 'http://localhost:3000/auth/facebook/callback',
		profileFields: ['id', 'displayName', 'email', 'profileUrl', 'photos']
	}, function (accessToken, refreshToken, profile, done) {
		userService.findUserByProfile(profile, function(err, user){
			if(user){
				done(null, user);
			}else{
				userService.createUserByProfile(profile, function(err, user){
					done(null, user);
				});
			}
		});
	}));
}
