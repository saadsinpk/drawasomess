import { Droppable } from "react-beautiful-dnd";
import React from "react";
import ListItem from "./listItem";

const DraggableElement = ({ prefix, elements,SavedMove,removeSaved }) => (
  <ul className="list adminlist">
    <Droppable droppableId={`${prefix}`}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {elements.map((item, index) => (
            <ListItem key={item.entry_id} removed={removeSaved} saved={SavedMove} item={item} index={item.entry_id} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </ul>
);

export default DraggableElement;
