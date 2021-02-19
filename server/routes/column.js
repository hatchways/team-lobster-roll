const express = require("express");
const router = express.Router();
const Board = require("../models/Board");
const Column = require("../models/Column");
const Card = require("../models/Card");

// CREATE
router.post("/", async (req, res, next) => {
  try {
    if (req.body) {
      const data = req.body;
      const { boardId, title } = data;
      const newColumn = await Column.createNewColumn(title);
      const foundBoard = await Board.findBoard(boardId);

      foundBoard.columns = [...foundBoard.columns, newColumn._id];
      foundBoard.save();
      res.status(201).json({ data: newColumn });
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
