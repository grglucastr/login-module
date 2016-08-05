var authController = function (db) {

	var signUp = function (req, res) {

		var collection = db.collection('users');
		var user = {
			username: req.body.username,
			password: req.body.password
		};

		collection.insert(user, function (err, results) {
			req.login(results, function () {
				res.redirect('/auth/profile');
			});
		});
	};

	var signIn = function (req, res) {
		res.redirect('/auth/profile');
	};

	var signOut = function (req, res) {
		req.logout();
		req.session.destroy();
		res.redirect('/');
	};

	var authUserRequired = function (req, res, next) {
		if (!req.user) {
			res.redirect('/');
		}
		next();
	};

	var goProfile = function (req, res) {
		res.render('profile', {
			title: req.user.username + ' - Profile',
			user: req.user
		});
	};

	return {
		signUp: signUp,
		signIn: signIn,
		signOut: signOut,
		authUserRequired: authUserRequired,
		goProfile:goProfile,
	};
};

module.exports = authController;
