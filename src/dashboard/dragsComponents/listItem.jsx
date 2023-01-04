import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { AiFillHeart, AiOutlineClose } from "react-icons/ai";
const ListItem = ({ item, index,saved,removed }) => {
  const [itemsave, setitemsave] = useState()
  const handleSClick = (e) => {
    removed()
  }

  return (
    <Draggable draggableId={item.entry_id.toString()} index={index}>
      {(provided, snapshot) => {
        return (
          <li
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="list__item flex gap-2 items-center justify-between"
            key={index}
          >
            <div>
              <span>Username</span>
              <span>{item.username}</span>
            </div>
            <div>
              <span>Submission Date</span>
              <span>{item.submissiondate}</span>
            </div>
            {item.saved == 0 &&   <div className="heart">
              <button onClick={() => {}} data-heart={item.entry_id}>
              <AiFillHeart />
              </button>
            </div>}
           

            <button className="closebtn" id={item.entry_id} onClick={handleSClick}> X </button>
          </li>
        );
      }}
    </Draggable>
  );
};

export default ListItem;
