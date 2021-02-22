import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useStyles } from "../themes/calendarCardStyles";
import Card from "@material-ui/core/Card";
import RootRef from "@material-ui/core/RootRef";
import Typography from '@material-ui/core/Typography';

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
            <Typography className={classes.p}>{card.title}</Typography>
          </Card>
        </RootRef>
      )}
    </Draggable>
  );
}

export default CalendarCard;
