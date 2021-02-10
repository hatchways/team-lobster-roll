import React, { useState } from "react";
import {Link} from 'react-router-dom';
import {useStyles} from '../themes/loginSignup';
import { Button, Typography, TextField } from "@material-ui/core";

function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    // API verification steps ...
  };

  return (
    <div className={classes.main}>
      <div className={classes.contentBox}>
          <img className={classes.img} src="/images/sign-up.png" alt="women-computing" />
        </div>
        <div className={classes.contentBox}>
          <div className={classes.upperDetails}>
            <form className={classes.form}>
              <Typography 
                className="typography" 
                variant="h1"
              >
                Welcome back!
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
                type="password"
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
                Login
              </Button>
            </form>
          </div>
          <div className={classes.lowerDetails}>
            <Typography className="typography" variant="h5">
                Don't have an account?
            </Typography>
            <Link to="/signup" className={classes.bottomLink}>Sign up</Link>
          </div>
        </div>
    </div>
  );
}
export default Login;
