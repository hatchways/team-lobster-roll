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

// data from db that was fetched from global state
const cardsFromDb = [
  { id: "card-1", title: "Math Exam", status: "red", deadline: "2021-02-19" },
  {
    id: "card-2",
    title: "Comp Sci Project",
    status: "red",
    deadline: "2021-02-19",
  },
  {
    id: "card-3",
    title: "Biology Exam",
    status: "red",
    deadline: "2021-02-22",
  },
  {
    id: "card-4",
    title: "Chemisty Exam",
    status: "red",
    deadline: "2021-02-18",
  },
];

// test result obj
const result = {
	draggableId: 'task-4',
	type: 'TYPE',
	reason: 'DROP',
	source: {
		droppableId: '2021-02-19',
		index: 1
	},
	destination: {
		droppableId: '2021-02-19',
		index: 0
	}
};

function Calendar() {
  const [calendar, setCalendar] = useState([]);
  const [value, setValue] = useState(moment());
	//const [cardsData, setCards] = useState(cardsFromDb);
	const classes = useStyles();

  useEffect(() => {
    setCalendar(buildCalendar(value));
		console.log(buildCalendar(value))
  }, [value]);
	
  const onDragEnd = (result) => {
		const {destination, source, draggableId} = result;
		if (!destination) return;
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		);
		
		let cell = {};
		let newCards = [];
		let weekIndex = 0;
		let dayIndex = 0;
				
		for (let i=0; i<calendar.length; i++) {
			for (let j=0; j<calendar[i].length; j++) {
				if (calendar[i][j].id === source.droppableId) {
					cell = calendar[i][j];
					newCards = Array.from(calendar[i][j].cards);
					weekIndex = i;
					dayIndex = j;
					break;
				}
			}
		};
		
		console.log(calendar[weekIndex][dayIndex]);
		
		newCards.splice(source.index, 1);
		newCards.splice(destination.index, 0, cell);
		const newCalendar = calendar;
		newCalendar[weekIndex][dayIndex].cards = newCards;
		
		console.log(newCalendar[weekIndex][dayIndex]);
		
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
