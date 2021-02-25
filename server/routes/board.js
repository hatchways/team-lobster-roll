const express = require("express");
const router = express.Router();
const Board = require("../models/Board");
const Column = require("../models/Column");
const Card = require("../models/Card");
const User = require("../models/User");

// GET
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const foundBoard = await Board.findBoard(id);
    res.status(200).json({ data: foundBoard });
  } catch (err) {
    console.error(err);
  }
});

// CREATE
router.post("/", async (req, res, next) => {
  try {
    if (req.body) {
      const data = req.body;
      const { title, userId } = data;
      const newBoard = await Board.createNewBoard(title, userId);
      const foundUser = await User.findUser(userId);

      foundUser.boards = [...foundUser.boards, newBoard._id];
      foundUser.save();
      res.status(201).json({ data: newBoard });
    }
  } catch (err) {
    console.error(err);
  }
});

// EDIT
router.patch("/:id", async (req, res, next) => {
  try {
    if (req.body) {
      const data = req.body;
      const { title } = data;
      const newData = {
        name: title,
      };
      const { id } = req.params;
      const updatedBoard = await Board.findByIdAndUpdate(
        id,
        newData,
        (err, board) => {
          res.send(board);
        }
      );
    }
  } catch (err) {
    console.error(err);
  }
});

// DELETE
router.delete("/", async (req, res, next) => {
  try {
    const { userId, boardId } = req.body;
    const deletedBoard = await Board.deleteBoard(boardId);
    const updateUser = await User.deleteBoard(userId, boardId);
    res.status(200).json({ msg: `Board ${boardId} deleted successfully` });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
