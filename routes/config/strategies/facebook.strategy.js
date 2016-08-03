var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/appLoginDB');

module.exports = function () {
	passport.use(new FacebookStrategy({
		clientID: '1441798922500688',
		clientSecret: 'FACEBOOK_APP_SECRET',
		callbackURL: "localhost:3000/auth/facebook/callback"
	}, function(accessToken, refreshToken, profile, done){
		var user = {
			username: profile.displayName,
			email: profile.emails[0].value,
			photo: profile.photos[0].value,
			provider: profile.provider
		}

		var collection = db.collection('users');

		collection.findOne({email:user.email}, function(err, result){
			if(result){
				done(null, user);
			}else{
				collection.insert(user, function(err, result){
					done(null, result);
				});
			}
		});
	}));
}
