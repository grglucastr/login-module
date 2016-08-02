var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/appLoginDB');

module.exports = function () {
	passport.use(new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password'
	},function(username, password, done){

		var collection = db.collection('users');
		collection.findOne({username:username}, function(err, result){
			if(result.password === password){
				var user = result;
				done(null, user);
			}else{
				done(null, false, {message: 'Bad password'});
			}
		});
	}));
}
