import React, { useState, useContext, useEffect } from "react";
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
import { SocketContext } from "../contexts/SocketContext";
import { Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CreateModal from "./CreateModal";
import UploadImage from "./UploadImage";
import Members from "./Members";

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
  const { socket } = useContext(SocketContext);
  const [showModal, setShowModal] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showMembers, setShowMembers] = useState(false);

	// socket.io testing
  useEffect(() => {
    if (socket) {
      socket.emit("testEmit", "testing emit");

      socket.on("confirmEmit", (message) => {
        console.log(message);
      });
    }
  }, [socket]);

  // componentWillUnmount
  useEffect(() => {
    return () => {
      socket.removeAllListeners("confirmEmit");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.blue}>
        <Toolbar>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-between"
          >
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
                onClick={() => setShowModal(true)}
              >
                <AddIcon />
                Create column
              </Button>
              <Button
                variant="outlined"
                color="primary"
                className={classes.buttonCreate}
                onClick={() => setShowUpload(true)}
              >
                Choose Profile Image
              </Button>
              <Button
                variant="outlined"
                color="primary"
                className={classes.buttonCreate}
                onClick={() => setShowMembers(true)}
              >
                Members
              </Button>
              <IconButton color="inherit">
                <MenuIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <List />
      {showModal && <CreateModal setShowModal={setShowModal} type="column" />}
      {showUpload && <UploadImage setShowUpload={setShowUpload} />}
      {showMembers && <Members setShowMembers={setShowMembers} />}
    </div>
  );
}

export default Board;
