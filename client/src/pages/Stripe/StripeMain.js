import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  AppBar,
  Typography,
  Button,
  Paper,
  Grid,
  Container,
  TextField,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { createCheckout } from "../../API/stripe";
require("dotenv").config();
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TEST_KEY);

const useStyles = makeStyles((theme) => ({
  header: {
    paddingTop: "2rem",
  },
  container: {
    margin: "4rem auto",
    width: "90%",
  },
  card: {
    padding: "2rem",
    margin: "2rem",
  },
  title: {
    color: "#000000",
    margin: "0 0 2rem 0",
    fontWeight: "bold",
  },
  button: {
    margin: "1rem 0",
    padding: "1rem",
    width: "100%",
    color: "#FFFFFF",
    fontSize: "1rem",
  },
  input: {
    marginBottom: "1.5rem",
  },
}));

function StripeMain(props) {
  const classes = useStyles();
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
    <div>
      <AppBar position="static" className={classes.header}>
        <Grid container alignItems="center" justify="center">
          <Grid item>
            <Typography variant="h4" className={classes.title}>
              Stripe Main Page!
            </Typography>
          </Grid>
        </Grid>
      </AppBar>
      <Container className={classes.container}>
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          justify="center"
          spacing={4}>
          <Grid item>
            <Paper className={classes.card}>
              <Grid container item direction="column">
                <Grid container item direction="column" alignItems="center">
                  <Grid item>
                    <InputLabel>
                      <Typography variant="h4" className={classes.title}>
                        Select how many months
                      </Typography>
                    </InputLabel>
                  </Grid>
                  <Grid item>
                    <TextField
                      className={classes.input}
                      type="number"
                      variant="outlined"
                      label="Enter quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}></TextField>
                  </Grid>
                </Grid>
                <Grid item>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={(e) => handleCheckout("payment")}>
                    Checkout
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.card}>
              <Grid container item direction="column">
                <Grid item>
                  <Typography variant="h4" className={classes.title}>
                    Buy monthly subscription!
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={(e) => handleCheckout("subscription")}>
                    Subscribe
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
export default StripeMain;
