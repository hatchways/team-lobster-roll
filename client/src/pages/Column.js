import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task";
import CreateModal from "./CreateModal";
import { useStyles } from "../themes/columnStyles";
import ColumnOptions from "./ColumnOptions";

function Column(props) {
  const {
    column,
    tasks,
    idx,
    updateBoardInfo,
    removeTask,
    removeColumn,
  } = props;
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [showColOptions, setShowOptions] = useState(false);

  const handleUpdateBoardInfo = (type, componentId, property, newData) => {
    if (type === "task")
      updateBoardInfo(type, column._id, componentId, property, newData);
    if (type === "column")
      updateBoardInfo(type, componentId, null, property, newData);
  };

  const handleRemoveTask = (taskId) => {
    removeTask(column._id, taskId);
  };

  return (
    <>
      <Draggable draggableId={column.id} index={idx}>
        {(provided) => (
          <Grid
            className={classes.column}
            container
            direction="column"
            justify="flex-start"
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <div className={classes.columnHeader} {...provided.dragHandleProps}>
              <Typography variant="h5" className={classes.columnTitle}>
                {column.name}
              </Typography>
              <IconButton
                onClick={() => {
                  setShowOptions(true);
                }}
                className={classes.lightGray}
              >
                <MoreHoriz />
              </IconButton>
              {showColOptions && (
                <ColumnOptions
                  closeOptions={() => setShowOptions(false)}
                  columnId={column._id}
                  columnName={column.name}
                  updateBoardInfo={handleUpdateBoardInfo}
                  removeColumn={removeColumn}
                />
              )}
            </div>
            <Droppable droppableId={column.id} type="task">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {tasks.map((task, idx) => (
                    <Task
                      key={task._id}
                      columnName={column.name}
                      task={task}
                      idx={idx}
                      removeTask={handleRemoveTask}
                      updateBoardInfo={handleUpdateBoardInfo}
                    />
                  ))}
                  <span className={classes.placeholder}>
                    {provided.placeholder}
                  </span>
                </div>
              )}
            </Droppable>
            <Button
              variant="contained"
              className={classes.addButton}
              onClick={() => setShowModal(true)}
            >
              <Typography variant="body1"> Add a card</Typography>
            </Button>
          </Grid>
        )}
      </Draggable>
      {showModal && (
        <CreateModal
          setShowModal={setShowModal}
          type="card"
          columnId={column.id}
        />
      )}
    </>
  );
}

export default Column;
