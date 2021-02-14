const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.get("/:email/:password", async (req, res, next) => {
  const { email, password } = req.params;
  try {
    const user = await User.findByEmail(email);
    bcrypt.compare(password, user[0].password, (err, result) => {
      if (result) {
        res.status(200).send(user);
      } else res.status(401).send({ msg: "Check your credentials!" });
    });
  } catch (err) {
    res.status(404).send({ msg: err });
  }
});
module.exports = router;
