var passport = require('passport');

module.exports = function (app) {
	app.use(passport.initialize());
	app.use(passport.session());

	// Bundle the user up, store in the session for later
	passport.serializeUser(function(user, done){
		done(null, user);
	});

	// Put the user back out of the session.
	passport.deserializeUser(function(user, done){
		done(null, user);
	});

	// This file belows, deal with the database stuff...
	require('./strategies/local.strategy')();
	//require('./strategies/facebook.strategy')();
}
