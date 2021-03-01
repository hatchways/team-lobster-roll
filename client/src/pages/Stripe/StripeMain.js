import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./Checkout";
import { createCheckout } from "../../API/stripe";
require("dotenv").config();
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TEST_KEY);
function StripeMain(props) {
  const [quantity, setQuantity] = useState(1);
  async function handleCheckout() {
    const URL = `${window.location.origin}/stripe`;

    const dummyData = {
      quantity,
      success_url: `${URL}/success?id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${URL}/cancel`,
    };
    const res = await createCheckout(dummyData);
    const data = res.data;
    console.log("returned", data);
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
      <button onClick={handleCheckout}>Checkout</button>
      {/* <Checkout /> */}
    </>
  );
}
export default StripeMain;
