import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { createCheckout } from "../../API/stripe";
require("dotenv").config();
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TEST_KEY);
function StripeMain(props) {
  const [quantity, setQuantity] = useState(1);
  async function handleCheckout(mode) {
    const URL = `${window.location.origin}/stripe`;
    const priceVal =
      mode === "payment"
        ? "price_1IQI3XGWNZMUdr0uTnWJsJkI"
        : "price_1IQN7GGWNZMUdr0u72YLX4I8";
    const dummyData = {
      success_url: `${URL}/success?id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${URL}/cancel`,
      mode: mode,
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceVal,
          quantity: mode === "payment" ? quantity : 1,
        },
      ],
    };
    const res = await createCheckout(dummyData);
    const data = res.data;
    const stripe = await stripePromise;

    stripe.redirectToCheckout({ sessionId: data.id });
  }
  return (
    <>
      <h1>Stripe Main Page!</h1>
      <br />
      <label>How many</label>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}></input>
      <button onClick={(e) => handleCheckout("payment")}>Checkout</button>
      <br />
      <label>Buy subscription!</label>
      <button onClick={(e) => handleCheckout("subscription")}>Subscribe</button>
    </>
  );
}
export default StripeMain;
