import React, { useState, useContext, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
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
import { getBoard, editBoard } from "../API/board";

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
  const [selectBoard, setSelectBoard] = useState(0);
  const [board, setBoard] = useState({});
  const [currBoardId, setCurrBoardId] = useState("");

  const loadedData = useMemo(() => {
    const preloaded = { columns: {}, columnOrder: [] };
    return preloaded;
  }, []);
  useEffect(() => {
    async function fetchData() {
      const boardList = await getAllBoards();
      return setBoards(boardList);
    }
    fetchData();
  }, [getAllBoards]);
  useEffect(() => {
    const boardId = boards[selectBoard] && boards[selectBoard]._id;
    setCurrBoardId(boardId);
    async function fetchData() {
      const res = await getBoard(boardId);
      const loadedBoard = res.data;
      const loadedColumns = {};
      const loadedOrder = [];
      loadedBoard.columns.forEach((col) => {
        col.id = col._id;
        col.taskIds = col.cards.map((card) => card._id);
        loadedColumns[col._id] = col;
        loadedOrder.push(col._id);
      });
      loadedData.columns = loadedColumns;
      loadedData.columnOrder = loadedOrder;

      setBoard(loadedBoard);
    }
    boardId && fetchData();
  }, [boards, loadedData, selectBoard]);

  const Dropdown = () => {
    const allBoards = boards.map((board, idx) => (
      <Link to={`/board/${board._id}`} key={board._id}>
        <Typography variant="subtitle1" onClick={() => setSelectBoard(idx)}>
          {board.name}
        </Typography>
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
      <List loadedData={loadedData} />
      {showModal && (
        <CreateModal
          setShowModal={setShowModal}
          type="column"
          currBoardId={currBoardId}
        />
      )}
      {showDropdown && <Dropdown />}
    </div>
  );
}

export default Board;
