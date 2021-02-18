import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Button, Typography, TextField } from "@material-ui/core";
import { useStyles } from "../themes/loginSignup";
import { UserContext } from "../contexts/UserContext";

function SignUp(props) {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { setUser, setLoggedIn } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    email.includes("@")
      ? setEmailError("")
      : setEmailError("Email must contain an '@'.");
    password.length > 6
      ? setPasswordError("")
      : setPasswordError("Password must be > 6 characters.");
    if (!emailError.length && !passwordError.length) {
      axios
        .post(`${window.location.origin}/signup/`, {
          email: email,
          password: password,
        })
        .then((data) => {
          const userData = data.data;
          setUser(userData);
          setLoggedIn(true);
          history.push("/board");
        })
        .catch((err) => console.log(err));
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
              Sign up to Kanban
            </Typography>
            <TextField
              className={classes.textField}
              variant="outlined"
              label="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helperText={emailError}
              FormHelperTextProps={{ className: classes.helperText }}
            />
            <TextField
              className={classes.textField}
              type="password"
              variant="outlined"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText={passwordError}
              FormHelperTextProps={{ className: classes.helperText }}
            />
            <Button
              className={classes.button}
              type="submit"
              variant="contained"
              color="secondary"
              onClick={handleSubmit}>
              Sign Up
            </Button>
          </form>
        </div>
        <div className={classes.lowerDetails}>
          <Typography className="typography" variant="h5">
            Already have an account?
          </Typography>
          <Link to="/login" className={classes.bottomLink}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
