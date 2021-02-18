const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Find user
router.get("/", async (req, res, next) => {
  console.log(req.body)
  const { id } = req.body;
  try {
    const user = await User.findUser(id);
    res.status(201).json({ msg: user });
    }
  catch (err) {
    res.status(404).send({ msg: err });
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