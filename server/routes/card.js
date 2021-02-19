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
      const { columnId, title } = data;
      const newCard = await Card.createNewCard(title);
      const foundColumn = await Column.findColumn(columnId);

      foundColumn.columns = [...foundColumn.cards, newCard._id];
      foundColumn.save();
      res.status(201).json({ data: newCard });
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
