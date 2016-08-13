var userServices = function (User) {

	var createUser = function (request, callback) {
		var newUser = new User({
			name: request.body.name,
			email: request.body.email,
			password: request.body.password
		});

		newUser.save(function (err, user) {
			callback(err, user);
		});
	};

	var createUserByProfile = function (profile, callback) {
		var newUser = new User({
			name: profile.displayName,
			email: profile.emails[0].value,
			provider: profile.provider,
			providerID: profile.id,
			photo: profile.photos[0].value
		});

		newUser.save(function (err, user) {
			callback(err, user);
		});
	};

	var checkUserExists = function (email, callback) {
		var userCriteria = {email: email};
		findUser(userCriteria, callback);
	};

	var checkUserExistsProfile = function (profile, callback) {
		var userCriteria = {
			email: profile.emails[0].value,
			provider: profile.provider,
			providerID: profileID
		};

		findUser(userCriteria, callback);

	};

	var findUser = function(criteria, callback){
		User.findOne(criteria, function(err, user) {
			var userFound = false;
			if(user){
				userFound = true;
			}
			callback(err, userFound);
		});
	}

	return {
		createUser: createUser,
		createUserByProfile: createUserByProfile,
		checkUserExists: checkUserExists,
		checkUserExistsProfile: checkUserExistsProfile
	};
};

module.exports = userServices;
