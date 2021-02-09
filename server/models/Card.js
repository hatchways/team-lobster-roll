const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true,
		minlength: 1
	}
}, {collection: 'Card'});

const Card = mongoose.model('Card', CardSchema);
module.exports = Card;