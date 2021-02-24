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
  const { loadedData, currBoardId } = props;

  const [data, setData] = useState(loadedData);

  function handleCardMove(data, movement) {
    data.movement = movement;
    editBoard(currBoardId, data);
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
      const newColumnOrder = [...data.columnOrder];
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      const newState = {
        ...data,
        columnOrder: newColumnOrder,
      };
      setData(newState);
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    // DRAG CARD SAME COLUMN
    if (start === finish) {
      const newTaskIds = [...start.taskIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...start, taskIds: newTaskIds };
      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newState);
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
    const startTaskIds = [...start.taskIds];
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };
    const finishTaskIds = [...finish.taskIds];
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };
    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setData(newState);
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
            {data.columnOrder.map((columnId, idx) => {
              const column = data.columns[columnId];
              // const tasks = column.taskIds.map((taskId) => data.tasks[taskId]); //[]task {}
              const tasks = column.cards;
              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  idx={idx}
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
