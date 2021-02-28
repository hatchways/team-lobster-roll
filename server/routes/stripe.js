require("dotenv").config();

const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// CREATE
router.post("/payment", async (req, res, next) => {
  try {
    const data = req.body;
    const paymentIntent = await stripe.paymentIntents.create(data);
    return res.send(paymentIntent);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
