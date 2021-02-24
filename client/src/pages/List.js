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

const taskTypes = {
  "task-1": { id: "task-1", title: "art", color: "red", description: "March 14" },
  "task-2": { id: "task-2", title: "philosophy", color: "red" },
  "task-3": { id: "task-3", title: "cooking", color: "red" },
  "task-4": { id: "task-4", title: "gym", color: "red" },
  "task-5": { id: "task-5", title: "math", color: "green" },
  "task-6": { id: "task-6", title: "english", color: "green" },
  "task-7": { id: "task-7", title: "science", color: "green" },
  "task-8": { id: "task-8", title: "history", color: "green" },
};

const columnTypes = {
  "col-1": {
    id: "col-1",
    name: "To do",
    taskIds: [...Object.keys(taskTypes)],
  },
  "col-2": {
    id: "col-2",
    name: "In progress",
    taskIds: [],
  },
  "col-3": {
    id: "col-3",
    name: "Review",
    taskIds: [],
  },
  "col-4": {
    id: "col-4",
    name: "Completed",
    taskIds: [],
  },
};

const initialData = {
  columns: columnTypes,
  tasks: taskTypes,
  columnOrder: [...Object.keys(columnTypes)],
};

function List() {
  const classes = useStyles();
  const [data, setData] = useState(initialData);

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
      return;
    }
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
              const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  idx={idx}
                />
              );
            })}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default List;
