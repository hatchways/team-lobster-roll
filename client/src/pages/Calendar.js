import React, { useState, useEffect } from "react";
import moment from "moment";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import buildCalendar from "../utils/buildCalendar";

const useStyles = makeStyles({
  h1: {
    textAlign: "center",
    margin: "20px",
  },

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

  names: {
    textAlign: "center",
    backgroundColor: "white",
    height: "40px",
    border: "none",
  },

  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    listStyle: "none",
    margin: "5px 0px 5px 0px",
    padding: "2px 10px 0px 10px",
    backgroundColor: "#FFFFFF",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px 1px rgba(208,213,223,0.4)",

    width: "100%",
    height: "40px",
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

  note: {
    color: "#aaa",
  },
  red: {
    backgroundColor: "#FF5D48",
  },
  green: {
    backgroundColor: "#5ACD76",
  },
  blue: {
    backgroundColor: "#59B0FF",
  },
  yellow: {
    backgroundColor: "#EDAB1D",
  },
  purple: {
    backgroundColor: "#D460F7",
  },
  noColor: {
    backgroundColor: "transparent",
  },
});


// Calendar component
function Calendar() {
  const [calendar, setCalendar] = useState([]);
  const [value, setValue] = useState(moment());

  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);

  const classes = useStyles();

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

      <Container>
        {calendar.map((week) => (
          <div>
            {week.map((day) => (
              <Box className={classes.day}>
                <span>
                  <p className={`${classes.p} ${classes.dayNumber}`}>
                    {day.day.format("D")}
                  </p>
                  <p className={`${classes.p} ${classes.cardCount}`}>1 Card</p>
                </span>

                <Card className={classes.card}>
                  <span
                    className={`${classes.cardStatus} ${classes.red}`}
                  ></span>
                  <p className={classes.p}>Midterm Exam</p>
                </Card>
              </Box>
            ))}
          </div>
        ))}
      </Container>
    </div>
  );
}

export default Calendar;
