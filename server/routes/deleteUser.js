const express = require("express");
const router = express.Router();
const User = require("../models/User");
console.log(User);

router.get("/:email", async (req, res, next) => {
  const { email } = req.params;
  try {
    const user = await User.deleteUser(email);
    res.status(201).json({ msg: "User deleted." });
  } catch (err) {
    res.status(404).send({ msg: err });
  }
});
module.exports = router;
