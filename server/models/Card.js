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

// creates a new instance of the Card model and returns the saved instance
CardSchema.statics.createNewCard = async function(name) {
	const card = new this({ name });
	await card.save();
	return card;
};

// deletes a Card in the db by its _id
CardSchema.statics.deleteCard = function(cardId) {
	this.deleteOne({ _id: mongoose.Types.ObjectId(cardId)}).exec();
};

const Card = mongoose.model('Card', CardSchema);
module.exports = Card;