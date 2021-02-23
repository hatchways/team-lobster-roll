const express = require("express");
const router = express.Router();
const Board = require("../models/Board");

// Add users to share with
router.post("/", async (req, res, next) => {
  try {
    if (req.body) {
      const data = req.body;
      const { boardId, users } = data;
      const board = await Board.findBoard(boardId);
      const rawShares = [...board.members, ...users];
      board.members = [...new Set(rawShares)];
      board.save();
      res.status(201).json({ msg: `Shares added to ${board.name}.` });
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
