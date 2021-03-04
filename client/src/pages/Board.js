import React, { useState, useContext, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
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
import Members from "./Members";
import Chat from "./Chat";

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

function Board(props) {
  const classes = useStyles();
  const history = useHistory();
  const {
    boardList,
    currBoardId,
    setCurrBoardId,
    currBoard,
    user,
    createCount,
    setCreateCount,
  } = useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const [showModal, setShowModal] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [msg, setMsg] = useState({});
  const [socketMsg, setSocketMsg] = useState({});
  const { id } = useParams();

  useEffect(() => {
    setCurrBoardId(id);
  }, [id, setCurrBoardId]);

  useEffect(() => {
    if (currBoardId) {
      history.push(`/board/${currBoardId}`);
    }
  }, [currBoardId, history]);

  useEffect(() => {
    //for some reason this useEffect gets called when currBoardId is an empty string
    if (socket && currBoardId) {
      // removes duplicate socket listeners
      socket.removeAllListeners("roomResponse");

      socket.emit("joinRoom", currBoardId, user._id);
      socket.on("roomResponse", (message) => {
        console.log("roomresponse", message);
        if (message.boardId === currBoardId) {
          console.log("matching room boardid", message.boardId);
          setSocketMsg(message);
        }
        if (message.createCount > 0) {
          setCreateCount(message.createCount);
        }
      });
    }
  }, [socket, currBoardId, user._id]);

  useEffect(() => {
    if (msg) {
      if (createCount > 0) {
        socket.emit("editBoard", currBoardId, user._id, msg, createCount);
      } else {
        socket.emit("editBoard", currBoardId, user._id, msg, 0);
      }
    }
  }, [msg, user._id, currBoardId, createCount]);

  // componentWillUnmount
  useEffect(() => {
    return () => {
      socket.emit("leaveRoom", currBoardId);
      socket.removeAllListeners("roomResponse");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // joins socket room of the current selected board and leaves previous socket room
  const handleBoardSelect = (boardId) => {
    if (socket) {
      socket.emit("leaveRoom", currBoardId);
      socket.removeAllListeners("roomResponse");

      socket.emit("joinRoom", boardId);
      socket.on("roomResponse", (message) => {
        console.log(message);
      });
    }
  };

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
          <Link to={`/board/603e839b13f92009308260dd`}>
            603e839b13f92009308260dd
          </Link>
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
              <Button
                variant="outlined"
                color="primary"
                className={classes.buttonCreate}
                onClick={() => setShowUpload(true)}>
                Choose Profile Image
              </Button>
              <Button
                variant="outlined"
                color="primary"
                className={classes.buttonCreate}
                onClick={() => setShowMembers(true)}>
                Members
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
      <List
        loadedData={currBoard}
        currBoardId={currBoardId}
        setMsg={setMsg}
        socketMsg={socketMsg}
      />
      {showModal && <CreateModal setShowModal={setShowModal} type="column" />}
      {showDropdown && <Dropdown />}
      {showUpload && <UploadImage setShowUpload={setShowUpload} />}
      {showMembers && <Members setShowMembers={setShowMembers} />}
      <Chat socketMsg={socketMsg} />
    </div>
  );
}

export default Board;
