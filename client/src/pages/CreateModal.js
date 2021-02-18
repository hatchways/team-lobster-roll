import React, { useContext, useState } from "react";
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
  const { setShowModal } = props;

  const handleCreate = () => {
    setShowModal(false);
  };

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.backdrop}>
      <Paper className={classes.modal}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center">
          <Grid item className={classes.close}>
            <IconButton>
              <CloseIcon onClick={() => setShowModal(false)} />
            </IconButton>
          </Grid>
          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="center"
            className={classes.modalMain}>
            <Grid item>
              <Typography variant="h4" className={classes.title}>
                Create a new column
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                defaultValue="Add Title"
                variant="outlined"
                className={classes.input}></TextField>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.createButton}
                onClick={handleCreate}>
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
