const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/:email", async (req, res, next) => {
  const { email } = req.params;
  try {
    const user = await User.findByEmail(email);
    res.status(201).json({ msg: user });
  } catch (err) {
    res.status(404).send({ msg: err });
  }
});
module.exports = router;
