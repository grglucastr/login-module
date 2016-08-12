var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../../../models/user');

module.exports = function () {

	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	}, function (email, password, done) {
		User.findOne({email: email}, function (err, user) {
			if (err) {
				console.error(err);
				done(err);
			}

			if (user) {
				if (user.password === password) {
					done(null, user)
				}else{
					userPasswordFailed('Incorrect password', done);
				}
			} else{
				userPasswordFailed('User not found', done);
			}
		});
	}));

	var userPasswordFailed = function (realProblem, done) {
		console.error(realProblem);
		done(null, false, {message: 'User or password not valid!'});
	}
}
