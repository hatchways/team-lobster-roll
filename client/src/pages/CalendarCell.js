import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Box from "@material-ui/core/Box";
import RootRef from "@material-ui/core/RootRef";
import { makeStyles } from "@material-ui/core/styles";
import CalendarCard from "./CalendarCard";

const useStyles = makeStyles({
  p: {
    margin: "0",
    fontWeight: "bold",
    fontSize: "14px",
  },
  cardCount: {
    display: "inline-block",
    margin: "0px 5px 0px 5px",
    fontSize: "12px",
    color: "lightsteelblue",
  },
  dayNumber: {
    display: "inline-block",
    fontSize: "16px",
  },
  day: {
    display: "inline-block",
    position: "relative",
    boxSizing: "border-box",
    width: "calc(100% / 7)",
    height: "140px",
    padding: "5px",
    margin: "0",
    backgroundColor: "#F4F6FF",
    border: "1px solid gainsboro",
    fontWeight: "bold",
    color: "gray",
  },
});

// Calendar component
function CalendarCell({ day }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Droppable droppableId={day.id}>
        {(provided) => (
          <RootRef rootRef={provided.innerRef}>
            <Box {...provided.droppableProps} className={classes.day}>
              <span>
                <p className={`${classes.p} ${classes.dayNumber}`}>
                  {day.day.format("D")}
                </p>
                <p className={`${classes.p} ${classes.cardCount}`}>1 Card</p>
              </span>
              <CalendarCard />
              {provided.placeholder}
            </Box>
          </RootRef>
        )}
      </Droppable>
    </React.Fragment>
  );
}

export default CalendarCell;
