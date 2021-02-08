import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../List.css";

function List() {
  const examples = ["math", "english", "science", "history"];

  const [list, setList] = useState(examples);

  function handleOnDragEnd(res) {
    // console.log(res);
    if (!res.destination) return;
    const items = Array.from(list);
    const [reorderedItem] = items.splice(res.source.index, 1);
    items.splice(res.destination.index, 0, reorderedItem);
    setList(items);
  }

  return (
    <div className="list-container">
      <h1>List</h1>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="example">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {list.map((e, idx) => (
                <Draggable key={e} draggableId={e} index={idx}>
                  {(provided) => (
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}>
                      {e}
                    </li>
                  )}
                </Draggable>
              ))}
              <span className="placeholder">{provided.placeholder}</span>
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default List;
