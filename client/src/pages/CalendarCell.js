import React, {useEffect, useState} from "react";
import moment from 'moment';
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

// data from db and fetched from global state
const cards = [
	{ id: "task-1", title: "Math Exam", status: "red", deadline: "2021-02-22" },
  { id: "task-2", title: "Comp Sci Project", status: "r", deadline: "2021-02-19" },
  { id: "task-3", title: "Biology Exam", status: "red", deadline: "2021-02-28" },
  { id: "task-4", title: "Chemisty Exam", status: "red", deadline: "2021-02-28" }
];

function CalendarCell({ day }) {
 // const [filteredCards, setCards] = useState([]);
	const classes = useStyles();	
	
	/* useEffect(() => {
		setCards(cards.filter(card => day.isSame(card.deadline)))
	}, []); */
	
  return (
    
      <Droppable droppableId={day.id}>
        {provided => (
          <RootRef rootRef={provided.innerRef}>
            <Box {...provided.droppableProps} className={classes.day}>
              <span>
                <p className={`${classes.p} ${classes.dayNumber}`}>
                  {day.day.format("D")}
                </p>
                <p className={`${classes.p} ${classes.cardCount}`}>1 Card</p>
              </span>
							{ cards
								.filter(card => day.day.isSame(card.deadline))
								.map((card, index) => <CalendarCard key={card.id} card={card} index={index} />)								
							}
              {provided.placeholder}
            </Box>
          </RootRef>
        )}
      </Droppable>

  );
}

export default CalendarCell;