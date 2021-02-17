import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import Grid from "@material-ui/core/Grid";
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
  cardContainer: {
    position: "relative",
    minHeight: "60px",
    maxHeight: "85%",
    width: "100%",
    overflowY: "auto",
    overflowX: "hidden",
  },
});

function CalendarCell({ day }) {
  const [cards, setCards] = useState([]);
  const classes = useStyles();
	
	useEffect(() => {
		setCards(day.cards);
	}, [day]);

  return (
    <Grid item className={classes.day}>
      <span>
        <p className={`${classes.p} ${classes.dayNumber}`}>
          {day.number}
        </p>
        {cards.length === 0 ? null : cards.length > 1 ? (
          <p className={`${classes.p} ${classes.cardCount}`}>
            {cards.length} Cards
          </p>
        ) : (
          <p className={`${classes.p} ${classes.cardCount}`}>
            {cards.length} Card
          </p>
        )}
      </span>

      <Droppable droppableId={day.id}>
        {(provided) => (
          <div
            className={classes.cardContainer}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {cards.map((card, index) => (
              <CalendarCard key={card.id} card={card} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Grid>
  );
}

export default CalendarCell;
