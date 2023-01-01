import { Droppable } from "react-beautiful-dnd";
import React from "react";
import ListItem from "./listItem";

const DraggableElement = ({ prefix, elements }) => (
  <ul className="list adminlist">
    <Droppable droppableId={`${prefix}`}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {elements.map((item, index) => (
            <ListItem key={item.id} item={item} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </ul>
);

export default DraggableElement;
