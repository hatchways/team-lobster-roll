import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task";
import CreateModal from "./CreateModal";
import { useStyles } from "../themes/columnStyles";

function Column(props) {
  const { column, tasks, idx, selectColumn, showOptions } = props;
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);

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
            ref={provided.innerRef}>
            <div className={classes.columnHeader} {...provided.dragHandleProps}>
              <Typography variant="h5" className={classes.columnTitle}>
                {column.name}
              </Typography>
              <IconButton 
								onClick={() => {
									selectColumn(column);
									showOptions();
								}} 
								className={classes.lightGray}>
                <MoreHoriz />
              </IconButton>
            </div>
            <Droppable droppableId={column.id} type="task">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {tasks.map((task, idx) => (
                    <Task key={task.id} task={task} idx={idx} />
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
              onClick={() => setShowModal(true)}>
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
