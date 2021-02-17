import React from "react";
import { Toolbar, IconButton, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import logo from "../assets/logo.png";
import calendar from "../assets/calendar.svg";
import dashboard from "../assets/dashboard.svg";
import plus from "../assets/plus.svg";

const useStyles = makeStyles((theme) => ({
  profileIcon: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginLeft: "2em",
  },
  createButton: {
    paddingTop: "4px",
    paddingBottom: "4px",
    borderRadius: "8px",
    backgroundColor: "#759CFC",
    "&:hover": {
      backgroundColor: "#759CFC",
    },
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bar: {
    margin: "1rem auto",
  },
  fixRightMargin: {
    marginRight: "1rem",
  },
  third: {
    width: "30%",
    maxWidth: "350px",
  },
  click: {
    color: "#666",
    "&:hover": {
      color: "#759CFC",
    },
  },
}));

function Navbar(props) {
  const classes = useStyles();

  return (
    <>
      <Toolbar className={`${classes.flex} ${classes.bar}`}>
        <img src={logo} />
        <div className={`${classes.flex} ${classes.third}`}>
          <div className={`${classes.flex} ${classes.click}`}>
            <IconButton>
              <img src={dashboard} width="30px" height="30px" />
            </IconButton>
            <Typography variant="h6">Dashboard</Typography>
          </div>
          <div className={`${classes.flex} ${classes.click}`}>
            <IconButton>
              <img src={calendar} width="25px" height="25px" />
            </IconButton>
            <Typography variant="h6">Calendar</Typography>
          </div>
        </div>
        <div className={classes.flex}>
          <Button
            className={classes.createButton}
            type="submit"
            variant="contained"
            color="secondary">
            <IconButton>
              <img
                src={plus}
                width="25px"
                height="25px"
                style={{ color: "#FFF" }}
              />
            </IconButton>
            <Typography variant="body1" className={classes.fixRightMargin}>
              Create board
            </Typography>
          </Button>
          <img
            src="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
            className={classes.profileIcon}
          />
        </div>
      </Toolbar>
    </>
  );
}

export default Navbar;
