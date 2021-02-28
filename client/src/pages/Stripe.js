import React from "react";
import { createPayment } from "../API/stripe";

function Stripe(props) {
  async function handleClick() {
    const dummyData = {
      amount: 1000,
      currency: "usd",
      payment_method_types: ["card"],
      receipt_email: "jenny.rosen@example.com",
    };
    const res = await createPayment(dummyData);
  }

  return (
    <>
      <h1>Stripe!</h1>
      <br />
      <button onClick={handleClick}>Stripe Test</button>
    </>
  );
}
export default Stripe;
