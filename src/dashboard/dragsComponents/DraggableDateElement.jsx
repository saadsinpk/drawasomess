import { Droppable } from "react-beautiful-dnd";
import React from "react";
const DraggableDateElement = ({ title, prefix, user }) => (
  // <ul className="list adminlist">
  //   <Droppable droppableId={`${prefix}`}>
  //     {(provided) => (
  //       <div {...provided.droppableProps} ref={provided.innerRef}>
  //         {elements.map((item, index) => (
  //           <ListItem key={item.id} item={item} index={index} />
  //         ))}
  //         {provided.placeholder}
  //       </div>
  //     )}
  //   </Droppable>
  // </ul>
  <Droppable droppableId={`${prefix}`}>
    {(provided) => (
      <>
        <div
          style={{
            height: "50px",
            backgroundColor: "#ccc6",
            border: "1px solid #000",
          }}
          className="text-center"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {title}
          {user.name}
          {user.date}
        </div>
        {provided.placeholder}
      </>
    )}
  </Droppable>
);

export default DraggableDateElement;
