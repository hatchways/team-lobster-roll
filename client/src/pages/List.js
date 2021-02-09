import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const useStyles = makeStyles({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "5rem",
    backgroundColor: "#FFFFFF",
  },
  column: {
    margin: 0,
    padding: 0,
    backgroundColor: "#F4F6FF",
    borderRadius: "8px",
    width: "320px",
  },
  card: {
    listStyle: "none",
    margin: "1rem",
    padding: "1rem",
    backgroundColor: "#FFFFFF",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px 1px rgba(0,0,0,0.1)",
    fontWeight: "bold",
  },
  placeholder: {
    listStyle: "none",
  },
});

function List() {
  const classes = useStyles();
  const examples = ["math", "english", "science", "history"];
  const [list, setList] = useState(examples);

  function handleOnDragEnd(res) {
    if (!res.destination) return;
    const items = Array.from(list);
    const [reorderedItem] = items.splice(res.source.index, 1);
    items.splice(res.destination.index, 0, reorderedItem);
    setList(items);
  }

  return (
    <div className={classes.mainContainer}>
      <Typography variant="h1">List</Typography>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="column">
          {(provided) => (
            <Grid
              className={classes.column}
              container
              direction="column"
              justify="center"
              {...provided.droppableProps}
              ref={provided.innerRef}>
              {list.map((e, idx) => (
                <Draggable key={e} draggableId={e} index={idx}>
                  {(provided) => (
                    <Card
                      className={classes.card}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}>
                      {e}
                    </Card>
                  )}
                </Draggable>
              ))}
              <span className={classes.placeholder}>
                {provided.placeholder}
              </span>
            </Grid>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default List;
