import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useStyles } from "../themes/loginSignup";
import { Button, Typography, TextField } from "@material-ui/core";
import axios from "axios";
import io from "socket.io-client";
import { UserContext } from "../contexts/UserContext";
import { SocketContext } from "../contexts/SocketContext";

function Login(props) {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { setUser, setLoggedIn } = useContext(UserContext);
  const { setSocket } = useContext(SocketContext);
  const emailVerify = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);

  const handleSubmit = (e) => {
    e.preventDefault();
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

          const newSocket = io(window.location.origin);
          setSocket(newSocket);
          const boardId = userData.boards[0];
          history.push(`/board/${boardId}`);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email": {
        if (!emailVerify.test(value)) {
          setEmailError("Invalid email address.");
        } else setEmailError("");
        setEmail(value);
        break;
      }
      case "password": {
        if (value.length < 7) {
          setPasswordError("Must be at least 7 characters.");
        } else setPasswordError("");
        setPassword(value);
        break;
      }
      default:
        break;
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
              name="email"
              onChange={(e) => handleChange(e)}
              helperText={emailError}
              FormHelperTextProps={{ className: classes.helperText }}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              type="password"
              label="Password"
              value={password}
              name="password"
              onChange={(e) => handleChange(e)}
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
