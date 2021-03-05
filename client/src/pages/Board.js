import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import List from "./List";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Grid,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../contexts/UserContext";
import { SocketContext } from "../contexts/SocketContext";
import AddIcon from "@material-ui/icons/Add";
import CreateModal from "./CreateModal";
import UploadImage from "./UploadImage";
import Members from "./Members";
import Dropdown from "./Dropdown";

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

function Board(props) {
  const classes = useStyles();
  const history = useHistory();
  const {
    boardList,
    currBoardId,
    setCurrBoardId,
    setLoggedIn,
    currBoardName,
    currBoard,
    user,
    createCount,
    setCreateCount,
    sharedBoards,
  } = useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const [showModal, setShowModal] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [msg, setMsg] = useState({});
  const [socketMsg, setSocketMsg] = useState({});
  const { id } = useParams();
  const ref = useRef();
  const exceptionRef = useRef();

  useEffect(() => {
    handleBoardSelect(id);
    setCurrBoardId(id);
  }, [id, setCurrBoardId]);

  useEffect(() => {
    if (currBoardId) {
      setSocketMsg({ data: currBoard });
      setMsg({});
      history.push(`/board/${currBoardId}`);
    }
  }, [currBoardId, history]);

  const handlePackages = () => {
    setLoggedIn(false);
    history.push("/packages");
  };

  useEffect(() => {
    //for some reason this useEffect gets called when currBoardId is an empty string
    if (socket && currBoardId?.length) {
      // removes duplicate socket listeners
      socket.removeAllListeners("roomResponse");

      socket.emit("joinRoom", currBoardId, user._id);
      socket.on("roomResponse", (message) => {
        if (message.boardId === currBoardId) {
          setSocketMsg(message);
        }
        if (message.createCount > 0) {
          setCreateCount(message.createCount);
        }
      });
    }
  }, [socket, currBoardId, user._id, setCreateCount]);

  useEffect(() => {
    if (msg) {
      if (createCount > 0) {
        socket.emit("editBoard", currBoardId, user._id, msg, createCount);
      } else {
        socket.emit("editBoard", currBoardId, user._id, msg, 0);
      }
    }
  }, [msg, user._id, currBoardId, createCount, socket]);

  // componentWillUnmount
  useEffect(() => {
    return () => {
      socket.emit("leaveRoom", currBoardId);
      socket.removeAllListeners("roomResponse");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClick(e) {
    if (
      ref?.current?.contains(e.target) ||
      exceptionRef?.current?.contains(e.target)
    ) {
      return;
    }
    setShowDropdown(false);
  }

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [showDropdown]);

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
                Board: {currBoardName}
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
              <Button
                variant="outlined"
                color="primary"
                className={classes.buttonCreate}
                onClick={() => handlePackages()}>
                Upgrade
              </Button>
              <IconButton
                color="inherit"
                onClick={() => setShowDropdown(!showDropdown)}>
                <MenuIcon ref={exceptionRef} />
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
      {showDropdown && (
        <Dropdown
          boardList={boardList}
          sharedBoards={sharedBoards}
          passedRef={ref}
        />
      )}
      {showUpload && <UploadImage setShowUpload={setShowUpload} />}
      {showMembers && <Members setShowMembers={setShowMembers} />}
    </div>
  );
}

export default Board;
