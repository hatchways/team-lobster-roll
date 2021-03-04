import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { Typography, Grid, Paper, Button } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
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
const Dropdown = (props) => {
  const classes = useStyles();
  const { boardList, sharedBoards, passedRef } = props;
  const [viewCreator, setViewCreator] = useState(true);
  const [viewMember, setViewMember] = useState(true);

  const allBoards = boardList.map((board) => (
    <Link to={`/board/${board._id}`} key={`creator-${board._id}`}>
      <Typography variant="subtitle1">{board.name}</Typography>
    </Link>
  ));

  const allSharedBoards = sharedBoards.map((board) => (
    <Link to={`/board/${board._id}`} key={`member-${board._id}`}>
      <Typography variant="subtitle1">{board.name}</Typography>
    </Link>
  ));

  return (
    <Paper className={classes.dropdown} ref={passedRef}>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Typography variant="h6">Select board</Typography>
        </Grid>
        <Grid item>
          <Button size="small" onClick={() => setViewCreator(!viewCreator)}>
            Creator
          </Button>
        </Grid>
        <Grid item>{viewCreator ? allBoards : "..."}</Grid>
        <Grid item>
          <Button size="small" onClick={() => setViewMember(!viewMember)}>
            Member
          </Button>
        </Grid>
        <Grid item>
          {viewMember ? allSharedBoards : sharedBoards.length ? "..." : ""}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Dropdown;
