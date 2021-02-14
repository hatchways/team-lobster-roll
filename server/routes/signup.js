const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/User");

router.post("/:email/:password", (req, res, next) => {
  const { email, password } = req.params;
  let epCheck = false;
  if (email.includes("@") && password.length > 6 && (epCheck = true)) {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      const addUser = async () => {
        const user1 = new User({
          email: email,
          password: hash,
        });
        await user1
          .save()
          .then(() => res.status(200).send({ msg: "Account created!." }))
          .catch((err) => {
            res.status(401).send({ msg: err });
          });
      };
      addUser();
    });
  }
  !epCheck &&
    res.status(401).send({
      msg: "Email must contain '@' and password must be > 6 characters.",
    });
});
module.exports = router;
