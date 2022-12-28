// import React from "react";
// import { useState } from "react";

// export const nModalDailogContext = React.createContext();

// function ModalDailogProvider(props) {
//   const [showModalDailog, setShowModalDailog] = useState(false);
//   const [currentDailog, setCurrentDailog] = useState("demo");
//   const [modalID, setModalID] = useState(0);
//   const handleDailog = (e, id) => {
//     const currentDailog = e.target.id;
//     setShowModalDailog(!showModalDailog);
    
//     setCurrentDailog(currentDailog);
//     id && setModalID(id);
//   };
//   return (
//     <ModalDailogContext.Provider
//       value={{
//         showDailog: [showModalDailog, setShowModalDailog],
//         handleDailog,
//         currentModal: [currentDailog, setCurrentDailog],
//         modalID,
//       }}
//     >
//       {props.children}
//     </ModalDailogContext.Provider>
//   );
// }

// export default ModalDailogProvider;
