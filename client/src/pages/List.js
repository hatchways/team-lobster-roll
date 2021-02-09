import { Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const useStyles = makeStyles({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '5rem',
    backgroundColor: '#FFFFFF'
  },
  ul: {
    margin: 0,
    padding: 0,
    backgroundColor: "#F4F6FF",
    borderRadius: '8px',
    width: '320px'
  },
  li: {
    listStyle: 'none',
    margin: '1rem',
    padding: '1rem',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px 1px rgba(0,0,0,0.1)',
    fontWeight: 'bold'
  },
  placeholder: {
    listStyle: 'none',
  }
});


function List() {
  const classes = useStyles()
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
      <Typography variant="h1">
        List
      </Typography>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="example">
          {(provided) => (
            <ul className={classes.ul} {...provided.droppableProps} ref={provided.innerRef}>
              {list.map((e, idx) => (
                <Draggable key={e} draggableId={e} index={idx}>
                  {(provided) => (
                    <li
                      className={classes.li}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}>
                      {e}
                    </li>
                  )}
                </Draggable>
              ))}
              <span className={classes.placeholder}>{provided.placeholder}</span>
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default List;
