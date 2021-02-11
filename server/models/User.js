const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	firstName: {
		type: String,
		required: true,
		minlength: 2
	},
	lastName: {
		type: String,
		required: true,
		minlength: 2
	},
	email: {
		type: String,
		required: true,
		minlength: 5,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
});

// Add a new user
UserSchema.statics.addNewUser = function(firstName, lastName, email, password){
	return this.insert({
		"firstName": firstName,
		"lastName": lastName,
		"email": email,
		"password":password	
	})
}

// Remove a user
UserSchema.statics.deleteUser = function(id){
	return this.deleteOne({_id: id});	
}

// Find a user by email
UserSchema.statics.findByEmail = function(userEmail){
	return this.find({email: userEmail})
}

// Update user information
UserSchema.statics.changeEmail = function(id, newEmail){
	return this.update({_id:id},
		{
		$set:{ "email": newEmail}
		}
	)	
}

UserSchema.statics.changePassword = function(id, newPassword){
	return this.update({_id:id},
		{
		$set:{ password: newPassword}
		}
	)
}

const User = mongoose.model('User', UserSchema);
module.exports = User;