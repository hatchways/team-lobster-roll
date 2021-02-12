import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task";

const useStyles = makeStyles({
  column: {
    margin: "1rem 0.75rem",
    padding: 0,
    backgroundColor: "#F4F6FF",
    borderRadius: "8px",
    width: "320px",
    minHeight: "500px",
    "&:hover": {
      boxShadow: "0px 0px 10px 1px rgba(208,213,223,0.8)",
    },
  },
  placeholder: {
    listStyle: "none",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "1.5rem",
    marginBottom: "1rem",
  },
  moreHoriz: {
    color: "#D5DBF7",
  },
  addButton: {
    backgroundColor: "#759CFC",
    color: "#FFFFFF",
    width: "120px",
    boxShadow: "0px 0px 0px rgba(0,0,0,0)",
    margin: "1.5rem",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "#759CFC",
    },
    "&:active": {
      backgroundColor: "#759CFC",
    },
  },
  droppableArea: {
    minHeight: "400px",
    height: "100%",
  },
});

function Column(props) {
  const { column, tasks, idx } = props;
  const classes = useStyles();

  return (
    <Draggable draggableId={column.id} index={idx}>
      {(provided) => (
        <Grid
          className={classes.column}
          container
          direction="column"
          justify="flex-start"
          {...provided.draggableProps}
          ref={provided.innerRef}>
          <div className={classes.cardHeader} {...provided.dragHandleProps}>
            <Typography variant="h5">{column.name}</Typography>
            <MoreHoriz className={classes.moreHoriz} />
          </div>
          <Droppable droppableId={column.id} type="task">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={classes.droppableArea}>
                {tasks.map((task, idx) => (
                  <Task key={task.id} task={task} idx={idx} />
                ))}
                <span className={classes.placeholder}>
                  {provided.placeholder}
                </span>
              </div>
            )}
          </Droppable>
          <Button variant="contained" className={classes.addButton}>
            <Typography variant="body1"> Add a card</Typography>
          </Button>
        </Grid>
      )}
    </Draggable>
  );
}

export default Column;
