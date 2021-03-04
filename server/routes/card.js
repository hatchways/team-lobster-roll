const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Board = require("../models/Board");
const Column = require("../models/Column");
const Card = require("../models/Card");

// CREATE
router.post("/", async (req, res, next) => {
  try {
    if (req.body) {
      const data = req.body;
      const { columnId, title } = data;
      const newCard = await Card.createNewCard(title);
      const foundColumn = await Column.findColumn(columnId);

      foundColumn.cards = [...foundColumn.cards, newCard._id];
      foundColumn.save();
      res.status(201).json({ data: newCard });
    }
  } catch (err) {
    console.error(err);
  }
});

// UPDATE
router.put("/update/:id", async (req, res) => {
  try {
    if (req.body) {
      const card = await Card.updateCard(
        req.params.id,
        req.body.property,
        req.body.newData
      );
      res.status(200).send(card);
    }
  } catch (err) {
    console.error(err);
    res.status(400).send({ msg: "Update Unsuccessful." });
  }
});

// DELETE
router.delete('/delete', async (req, res) => {
	try {
		if (req.body) {
			const foundBoard = await Board.findBoard(req.body.boardId);
			await foundBoard.removeCard(req.body.cardId);
			res.status(200).end();
		}
	} catch (err) {
		console.error(err);
		res.status(400).send({ msg: "Could not delete card." });
	}
});

module.exports = router;

module.exports = router;
