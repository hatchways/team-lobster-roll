import React, { useState, useContext, useEffect } from "react";
import List from "./List";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Paper,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../contexts/UserContext";
import { Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CreateModal from "./CreateModal";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  blue: {
    backgroundColor: "#759CFC",
  },
  buttonCreate: {
    color: "#ffffff",
    borderColor: "#ffffff",
    marginRight: "1rem",
    "&:hover": {
      color: "#ffffff",
      borderColor: "#ffffff",
    },
  },
  dropdown: {
    minWidth: "100px",
    padding: "1rem",
    background: "#ffffff",
    zIndex: "1",
    position: "absolute",
    top: "160px",
    right: "1rem",
    boxShadow: "0px 0px 10px 1px rgba(0,0,0,0.15)",
    textAlign: "right",
  },
}));

function Board() {
  const classes = useStyles();
  const { user, getAllBoards } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [boards, setBoards] = useState([]);

  useEffect(async () => {
    const boardList = await getAllBoards();
    setBoards(boardList);
  }, []);

  const Dropdown = () => {
    const allBoards = boards.map((board) => (
      <Typography key={board._id}>{board.name}</Typography>
    ));

    return (
      <Grid item>
        <Paper className={classes.dropdown}>
          <Typography variant="body1">Select board</Typography>
          {allBoards}
        </Paper>
      </Grid>
    );
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.blue}>
        <Toolbar>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-between">
            <Grid item>
              <Typography variant="h6" className={classes.title}>
                My School Board
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                className={classes.buttonCreate}
                onClick={() => setShowModal(true)}>
                <AddIcon />
                Create column
              </Button>
              <IconButton
                color="inherit"
                onClick={() => setShowDropdown(!showDropdown)}>
                <MenuIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <List />
      {showModal && <CreateModal setShowModal={setShowModal} type="column" />}
      {showDropdown && <Dropdown />}
    </div>
  );
}

export default Board;
