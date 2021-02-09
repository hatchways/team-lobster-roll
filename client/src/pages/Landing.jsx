import React, { useState } from "react";
import "../styles/Landing.css";
import { Button, Typography } from "@material-ui/core";

function LandingPage() {
  
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
    <div className="container-main">
      <div className="container-content">
        <div className="container-image">
          <img src="/images/sign-up.png" alt="women-computing" />
        </div>
        <div className="container-details">
          <div className="upper-details">
            <Typography className="typography" variant="h1">
              {topMessage}
            </Typography>
            <form className="form">
              <input
                required
                className="form-input"
                type="email"
                name="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <input
                required
                className="form-input"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <Button
                type="submit"
                variant="contained"
                style={{
                  background: "rgb(41, 140, 238",
                  width: "90px",
                  color: "white",
                  marginTop: "25px",
                }}
                onClick={handleSubmit}
              >
                {logSign}
              </Button>
            </form>
          </div>
          <div className="lower-details">
            <Typography className="typography" variant="h5">
              {bottomMessage}
            </Typography>
            <button onClick={handleLowerButton}>{createLogin}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LandingPage;
