const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Find user
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findUser(id);
    res.status(201).send(user);
  } catch (err) {
    res.status(404).send({ msg: err });
  }
});

// Find user by email
router.get("/email/:email", async (req, res, next) => {
  const { email } = req.params;
  try {
    const user = await User.findByEmail(email);
    res.status(201).send(user);
  } catch (err) {
    res.status(404).send({ msg: err });
  }
});

// Filter users to share with
router.get("/filter-by-email", async (req, res, next) => {
  try {
    if (req.query) {
      const { email } = req.query;
      if (email !== "") {
        const users = await User.filterByEmail(email);
        res.status(201).send(users);
      }
    }
  } catch (err) {
    console.error(err);
  }
});

// Find users utilizing an id array
router.get("/board-members/:ids", async (req, res, next) => {
  try {
    if (req.params) {
      const { ids } = req.params;
      // "ids" appears as one long comma separated string
      const moddedIds = ids.split(",");
      const members = await User.findByIdArray(moddedIds);
      res.status(201).send(members);
    }
  } catch (err) {
    console.error(err);
  }
});

// Delete user
router.delete("/", async (req, res, next) => {
  const { id } = req.body;
  try {
    const user = await User.deleteUser(id);
    res.status(201).json({ msg: "User deleted." });
  } catch (err) {
    res.status(404).send({ msg: err });
  }
});

module.exports = router;
