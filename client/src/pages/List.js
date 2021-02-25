import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { editBoard } from "../API/board";

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

function List(props) {
  const classes = useStyles();
  const { loadedData, currBoardId, moves, setMoves } = props;

  function handleCardMove(data, movement) {
    data.movement = movement;
    editBoard(currBoardId, data);
    setMoves(moves + 1);
  }

  function handleOnDragEnd(result) {
    const { source, destination, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // DRAG COLUMN
    if (type === "column") {
      const moveData = {
        columnId: draggableId,
        destinationIdx: destination.index,
        sourceIdx: source.index,
      };
      handleCardMove(moveData, "column");
      return;
    }

    const start = loadedData.columns[source.droppableId];
    const finish = loadedData.columns[destination.droppableId];

    // DRAG CARD SAME COLUMN
    if (start === finish) {
      const moveData = {
        cardId: draggableId,
        fromColumnId: source.droppableId,
        toColumnId: destination.droppableId,
        destinationIdx: destination.index,
        sourceIdx: source.index,
      };
      handleCardMove(moveData, "same");

      return;
    }

    // DRAG CARD DIFFERENT COLUMN
    const moveData = {
      cardId: draggableId,
      fromColumnId: source.droppableId,
      toColumnId: destination.droppableId,
      destinationIdx: destination.index,
      sourceIdx: source.index,
    };
    handleCardMove(moveData, "different");
  }

  return (
    <DragDropContext onDragEnd={(result) => handleOnDragEnd(result)}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <div
            className={classes.columnsContainer}
            {...provided.droppableProps}
            ref={provided.innerRef}>
            {loadedData?.columnOrder.map((columnId, idx) => {
              const column = loadedData.columns[columnId];
              const tasks = column.cards;
              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  idx={idx}
                  moves={moves}
                />
              );
            })}
            <span>{provided.placeholder}</span>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default List;
