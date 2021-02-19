import React, { useState, useContext } from "react";
import List from "./List";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
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
}));

function Board() {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

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
              <IconButton color="inherit">
                <MenuIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <List />
      {showModal && (
        <CreateModal setShowModal={setShowModal} user={user} type="column" />
      )}
    </div>
  );
}

export default Board;
