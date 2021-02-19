const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
      const token = jwt.sign(
        { userId: user._id },
        process.env.COOKIE_SECRET_KEY || "ShH_SeCrEt_StUfF",
        { expiresIn: "24h" }
      );
      user
        .save()
        .then(() =>
          res
            .status(200)
            .cookie("user", { token: token }, { httpOnly: true })
            .send(user)
        )
        .catch((err) => res.status(401).send("That email is not available."));
    });
  }
  !epCheck &&
    res.status(401).send({
      msg: "Email must contain '@' and password must be > 6 characters.",
    });
});
module.exports = router;
