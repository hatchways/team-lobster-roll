import React, { useState, useEffect } from "react";
import moment from "moment";
import { DragDropContext } from "react-beautiful-dnd";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import buildCalendar from "../utils/buildCalendar";
import CalendarCell from "./CalendarCell";

const useStyles = makeStyles({
  h1: {
    textAlign: "center",
    margin: "20px",
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
  names: {
    textAlign: "center",
    backgroundColor: "white",
    height: "40px",
    border: "none",
  },
});

function Calendar() {
  const [calendar, setCalendar] = useState([]);
  const [value, setValue] = useState(moment());

  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);

  const classes = useStyles();

  const onDragEnd = (result) => {};

  return (
    <div>
      <h1 className={classes.h1}>
        {value.format("MMMM") + " " + value.format("YYYY")}
      </h1>

      <Container>
        <Box className={`${classes.day} ${classes.names}`}>Sun</Box>
        <Box className={`${classes.day} ${classes.names}`}>Mon</Box>
        <Box className={`${classes.day} ${classes.names}`}>Tue</Box>
        <Box className={`${classes.day} ${classes.names}`}>Wed</Box>
        <Box className={`${classes.day} ${classes.names}`}>Thur</Box>
        <Box className={`${classes.day} ${classes.names}`}>Fri</Box>
        <Box className={`${classes.day} ${classes.names}`}>Sat</Box>
      </Container>

      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {calendar.map((week) =>
            week.map((day) => <CalendarCell key={day.id} day={day} />)
          )}
        </Container>
      </DragDropContext>
    </div>
  );
}

export default Calendar;
