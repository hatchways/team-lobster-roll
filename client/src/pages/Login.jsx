import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useStyles } from "../themes/loginSignup";
import { Button, Typography, TextField } from "@material-ui/core";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

function Login(props) {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");

  const { setUser, setLoggedIn } = useContext(UserContext);

  const [passwordError, setPasswordError] = useState("");

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
        .post(`${window.location.origin}/login/`, {
          email: email,
          password: password,
        })
        .then((data) => {
          const userData = data.data[0];
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
              Welcome back!
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
              variant="outlined"
              type="password"
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
              Login
            </Button>
          </form>
        </div>
        <div className={classes.lowerDetails}>
          <Typography className="typography" variant="h5">
            Don't have an account?
          </Typography>
          <Link to="/signup" className={classes.bottomLink}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Login;
