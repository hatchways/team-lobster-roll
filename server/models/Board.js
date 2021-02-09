const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Column = require('./Column');

const BoardSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	columns: [Column.schema]
}, {collection: 'Board'});

// Creates a new instance of the Board model and saves it in the "Board" collection
BoardSchema.statics.createNewBoard = async function(name) {
	const inProgressCol = new Column({
		name: 'In Progress'
	});
	await inProgressCol.save();
	
	const completedCol = new Column({
		name: 'Completed'
	});
	await completedCol.save();
	
	const board = new this({
		name,
		columns: [inProgressCol, completedCol]
	});
	await board.save();
	
	return board;
};

const Board = mongoose.model('Board', BoardSchema);
module.exports = Board;