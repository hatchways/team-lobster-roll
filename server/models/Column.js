const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Card = require('./Card');

const ColumnSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	cards: [Card.schema]
}, {collection: 'Column'});

// creates a new instance of the Column model and returns the saved instance
ColumnSchema.statics.createNewColumn = async function(name) {
	const column = new this({ name });
	await column.save();
	return column;
};

// deletes a Column in the db by its _id
ColumnSchema.statics.deleteColumn = function(columnId) {
	this.deleteOne({ _id: mongoose.Types.ObjectId(columnId)}).exec();
};

// adds a Card model into the Column's cards array
ColumnSchema.methods.addNewCard = function(card) {
	this.cards.push(card);
	await this.save();
};

// removes a Card model by _id from the Column's cards array
ColumnSchema.methods.removeCard = function(cardId) {
	this.cards.pull({ _id: cardId });
	await this.save();
};

const Column = mongoose.model('Column', ColumnSchema);
module.exports = Column;