var authController = function (User) {

	var signUp = function (req, res) {
		var newUser = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		});

		newUser.save(function (err, user) {
			showError(err, res);

			req.login(user, function () {
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
		var user = req.user;
		var arrName = user.name.split(' ');
		var displayName = `${arrName[0]} ${arrName[arrName.length - 1]}`;
		user.displayName = displayName;

		res.render('profile', {
			title: req.user.username + ' - Profile',
			user: user
		});
	};

	var showError = function (err, res) {
		if (err) {
			res.status(err.status || 500);
			res.render('error', {
				message: err.message,
				error: {}
			});
		}
	};

	return {
		signUp: signUp,
		signIn: signIn,
		signOut: signOut,
		authUserRequired: authUserRequired,
		goProfile: goProfile,
	};
};

module.exports = authController;
