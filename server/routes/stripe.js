require("dotenv").config();

const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// GET
router.get("/success", async (req, res, next) => {
  try {
    const id = req.query.id;
    const session = await stripe.checkout.sessions.retrieve(id, {
      expand: ["line_items"],
    });

    return res.json(session);
  } catch (err) {
    console.error(err);
  }
});

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

// CREATE checkout session via Stripe
router.post("/checkout", async (req, res, next) => {
  try {
    const data = req.body;
    const dummyData = {
      success_url: data.success_url,
      cancel_url: data.cancel_url,
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price: "price_1IQI3XGWNZMUdr0uTnWJsJkI",
          quantity: data.quantity,
        },
      ],
    };
    const session = await stripe.checkout.sessions.create(dummyData);
    return res.json({
      id: session.id,
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
