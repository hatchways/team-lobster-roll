const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Find user
router.get("/", async (req, res, next) => {
  console.log(req.body);
  const { id } = req.body;
  try {
    const user = await User.findUser(id);
    res.status(201).send(user);
  } catch (err) {
    res.status(404).send({ msg: err });
  }
});

// Find user by email
router.post("/", async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findByEmail(email);
    res.status(201).send(user);
  } catch (err) {
    res.status(404).send({ msg: err });
  }
});

// Filter users to share with
router.post("/filter", async (req, res, next) => {
  try {
    if (req.body) {
      const { emailFilter } = req.body;
      if (emailFilter !== "") {
        const users = await User.filterByEmail(emailFilter);
        res.status(201).send(users);
      }
    }
  } catch (err) {
    console.error(err);
  }
});

// Find users utilizing an email array
router.post("/members", async (req, res, next) => {
  try {
    if (req.body) {
      const { emails } = req.body;
      const members = await User.findByEmailArray(emails);
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
