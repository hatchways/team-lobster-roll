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
    const { shallow } = req.query;
    if (shallow) {
      const foundBoard = await Board.findById(id);
      res.status(200).json(foundBoard);
    } else {
      const foundBoard = await Board.findBoard(id);
      res.status(200).json(foundBoard);
    }
  } catch (err) {
    console.error(err);
  }
});

// GET all boards where user is a member
router.get("/member/:email", async (req, res, next) => {
  try {
    const email = req.params.email;
    const foundBoards = await Board.findSharedBoard(email);
    res.status(200).json(foundBoards);
  } catch (err) {
    console.error(err);
  }
});

// CREATE
router.post("/", async (req, res, next) => {
  try {
    if (req.body) {
      const data = req.body;
      const { title, id } = data;
      const newBoard = await Board.createNewBoard(title, id);
      const foundUser = await User.findUser(id);
      foundUser.boards = [...foundUser.boards, newBoard._id];
      foundUser.save();
      res.status(201).json(newBoard);
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
      const { movement } = data;
      const boardId = req.params.id;
      const foundBoard = await Board.findById(boardId);
      if (movement === "column") {
        foundBoard.moveColumn(data);
      } else {
        foundBoard.moveCard(data);
      }
      res.status(200).json(foundBoard);
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

// Add users to share with
router.post("/share", async (req, res, next) => {
  try {
    if (req.body) {
      const data = req.body;
      const { boardId, id } = data;
      const board = await Board.findBoard(boardId);
      const rawShares = [...board.members, id];
      board.members = [...new Set(rawShares)];
      board.save();
      res.status(201).json({ msg: `Shares added to ${board.name}.` });
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
