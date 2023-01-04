import { Droppable } from "react-beautiful-dnd";
import React from "react";
const DraggableDateElement = ({ title, prefix, user }) => (
  <Droppable droppableId={`${prefix}`}>
    {(provided) => (
      <>
        <div
          style={{
            height: "50px",
            backgroundColor: "#ccc6",
          }}
          className={`text-center upcominglist ${user.name && "active"}`}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {title}
          <span> {user.name}</span>
          {user.date?.toString()}
        </div>
        {provided.placeholder}
      </>
    )}
  </Droppable>
);

export default DraggableDateElement;
