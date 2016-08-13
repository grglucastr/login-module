var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
	name:String,
	email:String,
	password:String,
	provider:String,
	providerID:String,
	photo:String
});
module.exports = mongoose.model("User", userSchema);
