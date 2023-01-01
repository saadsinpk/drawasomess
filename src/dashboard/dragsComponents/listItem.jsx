import { Draggable } from "react-beautiful-dnd";
const ListItem = ({ item, index }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <li
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="list__item flex gap-2 items-center justify-between"
            // onClick={(e) => handleClick(item, e)}
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
            <div className="heart">
              <button
                id={item.entry_id}
                //   onClick={handleEntrieslist}
              >
                H{/* <AiFillHeart /> */}
              </button>
            </div>

            <button
              className="closebtn"
              data-delete={item.entry_id}
              //   onClick={handlelistdelete}
            >
              X
            </button>
          </li>
        );
      }}
    </Draggable>
  );
};

export default ListItem;
