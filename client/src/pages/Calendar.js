import React, { useState, useEffect } from "react";
import moment from "moment";
import { DragDropContext } from "react-beautiful-dnd";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";
import buildCalendar from "../utils/buildCalendar";
import CalendarCell from "./CalendarCell";

const useStyles = makeStyles({
  h1: {
    textAlign: "center",
    margin: "20px",
  },
  day: {
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
	const classes = useStyles();

  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);
	
  const onDragEnd = (result) => {
		const {destination, source, draggableId} = result;
		if (!destination) return;
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) return;
		
		let newCards = [];
		let weekIndex = 0;
		let dayIndex = 0;
				
		for (let i=0; i<calendar.length; i++) {
			for (let j=0; j<calendar[i].length; j++) {
				if (calendar[i][j].id === source.droppableId) {
					newCards = JSON.parse(JSON.stringify(calendar[i][j].cards));
					weekIndex = i;
					dayIndex = j;
					break;
				}
			}
		};
	
		const newPosition = newCards.filter(card => card.id === draggableId)[0];
		newCards.splice(source.index, 1);
		newCards.splice(destination.index, 0, newPosition);		
		
		const newCalendar = JSON.parse(JSON.stringify(calendar));
		newCalendar[weekIndex][dayIndex].cards = newCards;
		setCalendar(newCalendar);
	};

  return (
    <div>
      <h1 className={classes.h1}>
        {value.format("MMMM") + " " + value.format("YYYY")}
      </h1>
			
			<Container>
				<Grid container>
					<Grid item className={`${classes.day} ${classes.names}`}>Sun</Grid>
					<Grid item className={`${classes.day} ${classes.names}`}>Mon</Grid>
					<Grid item className={`${classes.day} ${classes.names}`}>Tue</Grid>
					<Grid item className={`${classes.day} ${classes.names}`}>Wed</Grid>
					<Grid item className={`${classes.day} ${classes.names}`}>Thur</Grid>
					<Grid item className={`${classes.day} ${classes.names}`}>Fri</Grid>
					<Grid item className={`${classes.day} ${classes.names}`}>Sat</Grid>
				</Grid>

				<DragDropContext onDragEnd={onDragEnd}>
					<Grid container>
						{calendar.map((week) =>
							week.map((day) => <CalendarCell key={day.id} day={day} />)
						)}
					</Grid>
				</DragDropContext>
			</Container>
    </div>
  );
}

export default Calendar;
