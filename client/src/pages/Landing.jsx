import React, { useState } from "react";
import { Button, Typography, makeStyles, TextField } from "@material-ui/core";

const lobsterStyles = makeStyles({
  main: {
    width: "100%",
    height: "100vh",
    display: "flex",
    boxSizing: "border-box"
  },
  contentBox: {
    width: "50%",
    height: "100",
    textAlign: "center"
  },
  img: {
    width: "100%",
    height: "100%"
  },
  form: {
    width: "200px",
    margin: "auto"
  },
  textField: {
    boxShadow: "rgb(184, 213, 241) 2px 2px 5px",
    marginBottom: "8px"
  },
  button: {
    marginTop: "25px",
    background: "rgb(41, 140, 238)"
  },
  upperDetails: {
    height: "85%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  lowerDetails: {
    height: "15%",
    width: "100%",
    borderTop: "1px rgb(184, 213, 241) solid",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  bottomLink: {
    border: "none",
    width: "100px",
    cursor: "pointer",
    outlineStyle: "none",
    fontSize: "12px",
    color: "rgb(41, 140, 238)",
    background: "none",
    fontWeight: 600
  }
});

function LandingPage() {
  const classes = lobsterStyles();
  const [start, setStart] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [topMessage, setTopMessage] = useState("Welcome back!");
  const [bottomMessage, setBottomMessage] = useState("Don't have an account?");
  const [logSign, setLogSign] = useState("Login");
  const [createLogin, setCreateLogin] = useState("Create");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    // API verification steps ...
  };

  const handleLowerButton = (e) => {
    if (start) {
      setTopMessage("Sign up to Kanban");
      setLogSign("Sign up");
      setBottomMessage("Already have an account?");
      setCreateLogin("Login");
      setStart(false);
    } else {
      setTopMessage("Welcome back!");
      setLogSign("Login");
      setBottomMessage("Don't have an account?");
      setCreateLogin("Create");
      setStart(true);
    }
  };

  return (
    <div className={classes.main}>
      <div className={classes.contentBox}>
        <img
          className={classes.img}
          src="/images/sign-up.png"
          alt="women-computing"
        />
      </div>
      <div className={classes.contentBox}>
        <div className={classes.upperDetails}>
          <form className={classes.form}>
            <Typography className="typography" variant="h1">
              {topMessage}
            </Typography>
            <TextField
              className={classes.textField}
              variant="outlined"
              label="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              className={classes.button}
              type="submit"
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
            >
              {logSign}
            </Button>
          </form>
        </div>
        <div className={classes.lowerDetails}>
          <Typography className="typography" variant="h5">
            {bottomMessage}
          </Typography>
          <button className={classes.bottomLink} onClick={handleLowerButton}>
            {createLogin}
          </button>
        </div>
      </div>
    </div>
  );
}
export default LandingPage;