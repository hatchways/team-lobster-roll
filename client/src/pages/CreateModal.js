import React, { useState, useContext } from "react";
import {
  TextField,
  Typography,
  Button,
  Grid,
  Paper,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import { createBoard } from "../API/board";
import { createColumn } from "../API/column";
import { createCard } from "../API/card";
import { UserContext } from "../contexts/UserContext";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "2",
    background: "rgba(0,0,0,0.6)",
  },
  modal: {
    display: "flex",
    background: "#ffffff",
    padding: "1rem",
    width: "400px",
    height: "320px",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.1)",
  },
  modalMain: {
    height: "80%",
  },
  title: {
    fontWeight: "800",
    marginTop: "0.5rem",
  },
  createButton: {
    padding: "1rem 3rem",
    borderRadius: "8px",
    background: "#759CFC",
    textTransform: "capitalize",
    "&:hover": {
      background: "#759CFC",
    },
  },
  input: {
    width: "300px",
  },
  close: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    color: "#ccc",
  },
}));
function CreateModal(props) {
  const classes = useStyles();
  const { setShowModal, type } = props;
  const {
    user,
    createCount,
    setCreateCount,
    currBoardId,
    setCurrBoardId,
  } = useContext(UserContext);

  const [title, setTitle] = useState("");

  const handleCreate = (data, type) => {
    switch (type) {
      case "board": {
        const cleanedData = {
          id: data._id,
          title: title,
        };
        async function getData() {
          const res = await createBoard(cleanedData);
          const boardId = res.data._id;
          boardId && setCurrBoardId(boardId);
          setCreateCount(createCount + 1);
        }
        getData();
        break;
      }
      case "column": {
        const cleanedData = {
          boardId: currBoardId,
          title: title,
        };
        createColumn(cleanedData);
        setCreateCount(createCount + 1);
        break;
      }
      case "card": {
        const cleanedData = {
          columnId: props.columnId,
          title: title,
        };
        createCard(cleanedData);
        setCreateCount(createCount + 1);
        break;
      }
      default:
        return;
    }
  };
  const handleClick = () => {
    handleCreate(user, type);
    setShowModal(false);
  };

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.backdrop}
    >
      <Paper className={classes.modal}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item className={classes.close}>
            <IconButton onClick={() => setShowModal(false)}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="center"
            className={classes.modalMain}
          >
            <Grid item>
              <Typography variant="h4" className={classes.title}>
                Create a new {type}
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                placeholder="Add Title"
                variant="outlined"
                className={classes.input}
                onChange={(e) => setTitle(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.createButton}
                onClick={handleClick}
              >
                <Typography variant="body1">Create</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default CreateModal;
