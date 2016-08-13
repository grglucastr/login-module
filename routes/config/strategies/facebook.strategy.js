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

		userService.checkUserExistsProfile(profile, function(err, userFound){

		});
		var newUser = new User({
			name: profile.displayName,
			email: profile.emails[0].value,
			provider: profile.provider,
			providerID: profile.id,
			photo: profile.photos[0].value
		});

		newUser.save(function (err, user) {
			if (err) {
				console.error(`\n\n Error on save the user through Facebook: \n ${err} \n\n`);
				done(err);
			} else {
				done(null, user);
			}
		});
	}));
}
