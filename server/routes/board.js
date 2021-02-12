const express = require("express");
const router = express.Router();
const Board = require("../models/Board");
const Column = require("../models/Column");
const Card = require("../models/Card");

// CREATE
router.post("/board", async (req, res, next) => {
  try {
    if (req.body) {
      const data = req.body.data;
      const { type, title } = data;
      /* data obj should look like:
       {
        type: enum COLUMN / TASK ,
        title: str,
        description?: str
       } 
      */
      if (!type || !title) {
        res.status(400).send("Missing parameters");
      } else {
        //TODO: create new Col or Task
        if (type === "column") {
          const newColumn = await Column.createNewColumn({
            name: title,
            cards: [],
          });
          res.status(200).json(newColumn);
        } else {
          const newCard = await Card.createNewCard({
            name: title,
            //   description: description
          });
          res.status(200).json(newCard);
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
});

// EDIT
router.patch("/board/:id", async (req, res, next) => {
  try {
    if (req.body) {
      const data = req.body.data;
      const { type, title, description } = data;
      const { id } = req.params;
      /* data obj should look like:
       {
        type: enum COLUMN / TASK ,
        title: str,
        description?: str
       } 
      */
      if (!type || !title) {
        res.status(400).send("Missing parameters");
      } else {
        //TODO: edit select Col or Task
        if (type === "column") {
          const toUpdateColumn = await Column.findById(id);
          if (toUpdateColumn) {
            const updated = await toUpdateColumn.update({ title });
          }
        } else {
          const toUpdateCard = await Card.findById(id);
          const updated = await toUpdateCard.update({
            title,
            // description,
          });
        }
        res.status(200).send(`success: ${title} ${type} created!`);
      }
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
