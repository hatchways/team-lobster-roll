import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useStyles } from "../themes/loginSignup";
import { Button, Typography, TextField } from "@material-ui/core";
import { UserContext } from "../contexts/UserContext";

function SignUp(props) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser, setLoggedIn } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    // API verification steps ...
    //if successful, update UserContext & redirect
    const dummyData = {
      firstName: "Jane",
      lastName: "Doe",
      email: email,
      id: "jd123",
    };
    setUser(dummyData);
    setLoggedIn(true);
    props.history.push("/board");
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
            />
            <TextField
              className={classes.textField}
              type="password"
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
