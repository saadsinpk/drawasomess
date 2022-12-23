// import React from "react";
// import ReactDOM from "react-dom";
// import { ModalDailogContext } from "../../context/ModalDailogContext";
// import Faq from "./Faq";

// function Modal() {
//     const { showDailog, currentModal, modalID } = React.useContext(ModalDailogContext);
//     const [showModalDailog, setShowModalDailog] = showDailog;
//     const [currentDailog] = currentModal;
//     let classes = "modal";
//     classes += showModalDailog ? " is-visible" : "";
//     const renderModalBody = (currentDailog) => {
//         switch (currentDailog) {
//             case "faq":
//                 return <Faq />;
//                 default:
//         return null;
//         }
//     }
//   return (
//     <div  className={classes}>
//     {/* <div className="Modal__heading p-2 flex items-center">
//     <div className="Modal__heading--left" onClick={removeModal}><AiOutlineArrowLeft /></div>
//     <h2 className="Modal__heading-right mx-auto my-0">{popuptext}</h2>
//     </div> */}
//     <div className="Modal__body p-3">
//     {renderModalBody(currentDailog)}
          

//     </div>
//         </div>
//   )
// }

// export default Modal