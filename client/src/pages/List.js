import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
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
  const [boardData, setBoardData] = useState(loadedData);

  useEffect(() => {
    setBoardData(loadedData);
  }, [loadedData]);

  function handleCardMove(data, movement, newState) {
    data.movement = movement;
    setBoardData(newState);
    editBoard(currBoardId, data);
  }

  function handleOnDragEnd(result) {
    const { source, destination, draggableId, type } = result;
    // error handling
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
      // generate newState
      const newColumnOrder = [...boardData.columnOrder];
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      const newState = {
        ...boardData,
        columnOrder: newColumnOrder,
      };
      // generate data for API PATCH
      const moveData = {
        columnId: draggableId,
        destinationIdx: destination.index,
        sourceIdx: source.index,
      };
      handleCardMove(moveData, "column", newState);
      return;
    }
    // select source & destination columns
    const start = boardData.columns[source.droppableId];
    const finish = boardData.columns[destination.droppableId];

    // DRAG CARD SAME COLUMN
    if (start === finish) {
      // generate newState
      const newTaskIds = [...start.taskIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newCards = [...start.cards];
      const removed = newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, removed[0]);
      const newColumn = { ...start, taskIds: newTaskIds, cards: newCards };
      const newState = {
        ...boardData,
        columns: {
          ...boardData.columns,
          [newColumn.id]: newColumn,
        },
      };
      // generate data for API PATCH
      const moveData = {
        cardId: draggableId,
        fromColumnId: source.droppableId,
        toColumnId: destination.droppableId,
        destinationIdx: destination.index,
        sourceIdx: source.index,
      };
      handleCardMove(moveData, "same", newState);
      return;
    }

    // DRAG CARD DIFFERENT COLUMN
    // generate newState
    const startTaskIds = [...start.taskIds];
    startTaskIds.splice(source.index, 1);
    const startCards = [...start.cards];
    const removed = startCards.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
      cards: startCards,
    };
    const finishTaskIds = [...finish.taskIds];
    finishTaskIds.splice(destination.index, 0, draggableId);
    const finishCards = [...finish.cards];
    finishCards.splice(destination.index, 0, removed[0]);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
      cards: finishCards,
    };
    const newState = {
      ...boardData,
      columns: {
        ...boardData.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    // generate data for API PATCH
    const moveData = {
      cardId: draggableId,
      fromColumnId: source.droppableId,
      toColumnId: destination.droppableId,
      destinationIdx: destination.index,
      sourceIdx: source.index,
    };
    handleCardMove(moveData, "different", newState);
  }

  /*
		handles any board changes regarding card edits, 
		column name edits, or column/card deletions
	*/
  const handleUpdateBoardInfo = (type, columnId, cardId, property, newData) => {
    const cols = boardData.columns;
    if (type === "task") {
      let col = cols[columnId];
      let cardsList = col.cards;
      cardsList.forEach((card, index) => {
        if (card._id === cardId) {
          const updatedCard = {
            ...card,
            [property]: newData,
          };
          cardsList[index] = updatedCard;

          setBoardData({
            ...boardData,
            columns: {
              ...cols,
              [columnId]: {
                ...col,
                cards: cardsList,
              },
            },
          });
        }
      });
    }
  };

  // handles removing a task
  const handleRemoveTask = (columnId, taskId) => {
    const cols = boardData.columns;
    let col = cols[columnId];
    let cardsList = col.cards.filter((card) => card._id !== taskId);
    setBoardData({
      ...boardData,
      columns: {
        ...cols,
        [columnId]: {
          ...col,
          cards: cardsList,
        },
      },
    });
  };

  return (
    <DragDropContext onDragEnd={(result) => handleOnDragEnd(result)}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <div
            className={classes.columnsContainer}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {boardData?.columnOrder.map((columnId, idx) => {
              const column = boardData.columns[columnId];
              const tasks = column.cards;
              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  idx={idx}
                  updateBoardInfo={handleUpdateBoardInfo}
                  removeTask={handleRemoveTask}
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
