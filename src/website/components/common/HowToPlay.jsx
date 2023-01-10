import React from 'react';
import img1 from '../../../dist/webImages/2.png'
import { AiOutlineClose } from "react-icons/ai";

function HowToPlay({closePlay}) {
    const  activefuntion = (e) => {
        e.preventDefault();
      };
    const closefuntion = (e) => {
      closePlay(false)
      };
  return (  

   <>
   <div  className={'Modal'} onClick={closefuntion}>
    <div className="ModalBox" onClick={(e) => e.stopPropagation()}>
   <div className="closebutton ml-auto text-right px-2">
       <button onClick={closefuntion}><AiOutlineClose /></button>
   </div>
   <h2><b>How to Play</b></h2>
   <p>Press play and guess the word or phrase under 60 seconds. You win when entering the correct word or phrase of the day.</p>
   <div className="section10_img my-3">
    <img src={img1} alt="" />
   </div>
   <div className="section10_Box my-3 mx-auto"></div>
   <div className="forst my-2 mx-auto text-center py-2">Forest</div>
   <div className="section10_t mt-4">
    <p>There is a new word or phrase every day at midnight 12AM EST.</p>
    <p>You also have the opportunity to draw your own image to submit for use for future entries.</p>
   </div>
   </div>
  </div></>
  )
}

export default HowToPlay