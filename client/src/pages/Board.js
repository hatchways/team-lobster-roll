import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
import { SocketContext } from "../contexts/SocketContext";
import { Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CreateModal from "./CreateModal";
import UploadImage from "./UploadImage";

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
  const { boardList, currBoardId, setCurrBoardId, currBoard } = useContext(
    UserContext
  );
  const { socket } = useContext(SocketContext);
  const [showModal, setShowModal] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setCurrBoardId(id);
  }, [id, setCurrBoardId]);
  const Dropdown = () => {
    const allBoards = boardList.map((board) => (
      <Link to={`/board/${board._id}`} key={board._id}>
        <Typography variant="subtitle1">{board.name}</Typography>
      </Link>
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
                onClick={() => setShowDropdown(!showDropdown)}></IconButton>
              <Button
                variant="outlined"
                color="primary"
                className={classes.buttonCreate}
                onClick={() => setShowUpload(true)}>
                Choose Profile Image
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
      <List loadedData={currBoard} currBoardId={currBoardId} />
      {showModal && (
        <CreateModal
          setShowModal={setShowModal}
          type="column"
          currBoardId={currBoardId}
        />
      )}
      {showDropdown && <Dropdown />}
      {showUpload && <UploadImage setShowUpload={setShowUpload} />}
    </div>
  );
}

export default Board;
