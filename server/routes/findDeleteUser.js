const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res, next) => {
  const { id, action } = req.body;
  let user;
  try {
    if (action === "find") {
      user = await User.findUser(id);
      res.status(201).json({ msg: user });
    } else {
      user = await User.deleteUser(id);
      res.status(201).json({ msg: "User deleted." });
    }
  } catch (err) {
    res.status(404).send({ msg: err });
  }
});
module.exports = router;
