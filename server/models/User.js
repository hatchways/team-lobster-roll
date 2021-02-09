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
}, {collection: 'User'});

const User = mongoose.model('User', UserSchema);
module.exports = User;