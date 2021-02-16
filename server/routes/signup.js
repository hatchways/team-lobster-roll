const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.post("/", (req, res, next) => {
  const { email, password } = req.body;
  let epCheck = false;
  if (email.includes("@") && password.length > 6) {
    epCheck = true;
    bcrypt.hash(password, 10, (err, hash) => {
      const user = new User({
        email: email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(200).send({ msg: "Account created!." }))
        .catch((err) => res.status(401).send("That email is not available."));
    });
  }
  !epCheck &&
    res.status(401).send({
      msg: "Email must contain '@' and password must be > 6 characters.",
    });
});
module.exports = router;
