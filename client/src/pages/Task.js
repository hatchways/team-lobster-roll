import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Typography } from "@material-ui/core";

import { Draggable } from "react-beautiful-dnd";

const useStyles = makeStyles({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    listStyle: "none",
    margin: "0.5rem 1rem",
    padding: "1rem",
    backgroundColor: "#FFFFFF",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px 1px rgba(208,213,223,0.4)",
    fontWeight: "bold",
    width: "290px",
    minHeight: "60px",
    height: "100%",
    boxSizing: "border-box",
    "&:hover": {
      border: "2px solid #80A3FB",
    },
    "&:active": {
      boxShadow: "0px 0px 10px 1px rgba(128,163,251,0.8)",
    },
  },
  cardStatus: {
    height: "0px",
    width: "40px",
    borderRadius: "8px",
    padding: "5px",
    margin: "0.5rem 0",
  },
  note: {
    color: "#aaa",
  },
});

function Task(props) {
  const classes = useStyles(props);
  const { task, idx } = props;
  return (
    <Draggable draggableId={task.id} index={idx}>
      {(provided) => (
        <Card
          className={classes.card}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}>
          <span
            className={classes.cardStatus}
            style={{ backgroundColor: task.status }}></span>
          <Typography variant="h6">{task.title}</Typography>
          {task.note ? (
            <Typography variant="body1" className={classes.note}>
              {task.note}
            </Typography>
          ) : (
            ""
          )}
        </Card>
      )}
    </Draggable>
  );
}

export default Task;
