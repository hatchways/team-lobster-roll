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

const Column = mongoose.model('Column', ColumnSchema);
module.exports = Column;