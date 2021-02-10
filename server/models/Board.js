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

// creates a new instance of the Board model and returns the saved instance
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

// deletes a Board in the db by its _id
BoardSchema.statics.deleteBoard = function(boardId) {
	this.deleteOne({ _id: mongoose.Types.ObjectId(boardId)}).exec();
};

// adds a Column model into the Board's columns array
BoardSchema.methods.addNewColumn = function(column) {
	this.columns.push(column);
	await this.save();
};

// removes a Column model by _id from the Board's columns array
BoardSchema.methods.removeColumn = function(columnId) {
	this.columns.pull({ _id: columnId });
	await this.save();
};

const Board = mongoose.model('Board', BoardSchema);
module.exports = Board;