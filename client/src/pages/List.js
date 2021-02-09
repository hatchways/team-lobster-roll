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
  columnsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  column: {
    margin: "1rem",
    padding: 0,
    backgroundColor: "#F4F6FF",
    borderRadius: "8px",
    width: "320px",
    minHeight: "500px",
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
  cardHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const columnTypes = {
  ToDo: {
    name: "To do",
    items: ["math", "english", "science", "history"],
  },
  InProgress: {
    name: "In progress",
    items: ["art", "philosophy", "cooking", "gym"],
  },
};

function List() {
  const classes = useStyles();
  const [columns, setColumns] = useState(columnTypes);

  function handleOnDragEnd(result, columns, setColumns) {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destinationColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destinationItems = [...destinationColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destinationItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destinationColumn,
          items: destinationItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  }

  return (
    <div className={classes.mainContainer}>
      <Typography variant="h1">List</Typography>
      <DragDropContext
        onDragEnd={(result) => handleOnDragEnd(result, columns, setColumns)}>
        <div className={classes.columnsContainer}>
          {Object.entries(columns).map(([id, column]) => {
            return (
              <div>
                <Typography variant="h3" className={classes.cardHeader}>
                  {column.name}
                </Typography>
                <Droppable droppableId={id}>
                  {(provided) => (
                    <Grid
                      className={classes.column}
                      container
                      direction="column"
                      justify="flex-start"
                      {...provided.droppableProps}
                      ref={provided.innerRef}>
                      {column.items.map((e, idx) => (
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
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}

export default List;
