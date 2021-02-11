import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Column from "./Column";

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
    alignItems: "flex-start",
  },
});
const sampleArr1 = [
  { title: "art", status: "red", note: "March 14" },
  { title: "philosophy", status: "red" },
  { title: "cooking", status: "red" },
  { title: "gym", status: "red" },
];
const sampleArr2 = [
  { title: "math", status: "green" },
  { title: "english", status: "green" },
  { title: "science", status: "green" },
  { title: "history", status: "green" },
];
const columnTypes = {
  ToDo: {
    name: "To do",
    items: sampleArr1,
  },
  InProgress: {
    name: "In progress",
    items: sampleArr2,
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
      <DragDropContext
        onDragEnd={(result) => handleOnDragEnd(result, columns, setColumns)}>
        <div className={classes.columnsContainer}>
          {Object.entries(columns).map(([id, column]) => {
            return <Column id={id} column={column} />;
          })}
        </div>
      </DragDropContext>
    </div>
  );
}

export default List;
