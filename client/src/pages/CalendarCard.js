import React from "react";
import { Draggable } from "react-beautiful-dnd";
import Card from "@material-ui/core/Card";
import RootRef from "@material-ui/core/RootRef";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  p: {
    margin: "0",
    fontWeight: "bold",
    fontSize: "14px",
  },
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    listStyle: "none",
    margin: "5px 0px 5px 0px",
    padding: "5px 10px 5px 10px",
    backgroundColor: "#FFFFFF",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px 1px rgba(208,213,223,0.4)",
    width: "100%",
    minHeight: "40px",
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
    width: "30px",
    borderRadius: "8px",
    padding: "3px",
    margin: "0",
  },
  red: {
    backgroundColor: "#FF5D48",
  },
});

function CalendarCard({ card, index }) {
  const classes = useStyles();
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <RootRef rootRef={provided.innerRef}>
          <Card
            className={classes.card}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <span className={`${classes.cardStatus} ${classes.red}`}></span>
            <p className={classes.p}>{card.title}</p>
          </Card>
        </RootRef>
      )}
    </Draggable>
  );
}

export default CalendarCard;
