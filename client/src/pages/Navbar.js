import React, { useContext, useState, useEffect, useRef } from "react";
import {
  Toolbar,
  Typography,
  Button,
  Grid,
  Paper,
  Avatar,
  makeStyles,
} from "@material-ui/core";
import CalendarTodayIcon from "@material-ui/icons/CalendarTodayOutlined";
import DashboardIcon from "@material-ui/icons/DashboardOutlined";
import AddIcon from "@material-ui/icons/Add";
import { UserContext } from "../contexts/UserContext";
import CreateModal from "./CreateModal";
import { useHistory } from "react-router-dom";
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
    "&:hover": {
      cursor: "pointer",
      boxShadow: "0px 0px 10px 1px rgba(128,163,251,0.1)",
    },
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
    minWidth: "250px",
  },
  click: {
    color: "#666",
    "&:hover": {
      color: "#759CFC",
      cursor: "pointer",
    },
  },
  userCard: {
    minWidth: "100px",
    padding: "1rem",
    background: "#ffffff",
    zIndex: "1",
    position: "absolute",
    top: "95px",
    right: "1rem",
    boxShadow: "0px 0px 10px 1px rgba(0,0,0,0.15)",
    textAlign: "right",
  },
}));

function Navbar(props) {
  const classes = useStyles();
  const { loggedIn, user, currBoardId, setUser, setLoggedIn } = useContext(
    UserContext
  );
  const { email } = user;
  const joinDate = user?.joinDate?.slice(0, 10);
  const [showUserCard, setShowUserCard] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const ref = useRef();
  const exceptionRef = useRef();

  function handleClick(e) {
    if (
      ref?.current?.contains(e.target) ||
      exceptionRef?.current?.contains(e.target)
    ) {
      return;
    }
    setShowUserCard(false);
  }

  useEffect(() => {
    if (showUserCard) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [showUserCard]);

  function handleLogout() {
    setUser({});
    setLoggedIn(false);
    history.push(`/`);
  }

  const UserCard = () => {
    return (
      <Paper className={classes.userCard} ref={ref}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="body1">{email}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">Joined: {joinDate}</Typography>
          </Grid>
          <Grid item>
            <Button size="small" variant="outlined" onClick={handleLogout}>
              Logout
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  };

  return (
    loggedIn && (
      <>
        <Toolbar className={`${classes.flex} ${classes.bar}`}>
          <img src={logo} alt="kanban logo" />
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
                justify="space-between"
                onClick={() => history.push(`/board/${currBoardId}`)}>
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
                justify="space-between"
                onClick={() => history.push("/calendar")}>
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
              color="primary"
              onClick={() => setShowModal(true)}>
              <AddIcon className={classes.fixRightMargin} />
              <Typography variant="body1" className={classes.fixRightMargin}>
                Create board
              </Typography>
            </Button>
            <Avatar
              src={user.image}
              className={classes.profileIcon}
              alt="profile-icon"
              onClick={() => setShowUserCard(!showUserCard)}
              ref={exceptionRef}
            />
          </Grid>
        </Toolbar>
        {showUserCard && <UserCard />}
        {showModal && <CreateModal setShowModal={setShowModal} type="board" />}
      </>
    )
  );
}

export default Navbar;
