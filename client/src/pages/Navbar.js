import React from "react";
import { Toolbar, Typography, Button, Grid } from "@material-ui/core";
import CalendarTodayIcon from "@material-ui/icons/CalendarTodayOutlined";
import DashboardIcon from "@material-ui/icons/DashboardOutlined";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";

import logo from "../assets/logo.png";

const useStyles = makeStyles((theme) => ({
  visualIcon: {
    width: "25px",
    height: "25px",
    marginRight: "1rem",
  },
  profileIcon: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginLeft: "2em",
  },
  createButton: {
    padding: "1rem 2rem",
    borderRadius: "8px",
    backgroundColor: "#759CFC",
    textTransform: "capitalize",
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
    padding: "0 3rem",
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
      cursor: "pointer",
    },
  },
}));

function Navbar(props) {
  const classes = useStyles();
  const defaultProfileImg =
    "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";

  return (
    <Toolbar className={`${classes.flex} ${classes.bar}`}>
      <img src={logo} />
      <Grid
        className={`${classes.third}`}
        container
        direction="row"
        alignItems="center"
        justify="space-between">
        <Grid item>
          <Grid
            className={`${classes.click}`}
            container
            direction="row"
            alignItems="center"
            justify="space-between">
            <Grid item>
              <DashboardIcon className={classes.visualIcon} />
            </Grid>
            <Grid item>
              <Typography variant="h6">Dashboard</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            className={`${classes.click}`}
            container
            direction="row"
            alignItems="center"
            justify="space-between">
            <Grid item>
              <CalendarTodayIcon className={classes.visualIcon} />
            </Grid>
            <Grid item>
              <Typography variant="h6">Calendar</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid className={classes.flex}>
        <Button
          className={classes.createButton}
          type="submit"
          variant="contained"
          color="secondary">
          <AddIcon className={classes.fixRightMargin} />
          <Typography variant="body1" className={classes.fixRightMargin}>
            Create board
          </Typography>
        </Button>
        <img
          src={defaultProfileImg}
          className={classes.profileIcon}
          alt="profile-icon"
        />
      </Grid>
    </Toolbar>
  );
}

export default Navbar;