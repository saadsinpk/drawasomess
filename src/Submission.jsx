import React from 'react'
import Header2 from './components/common/Header2';
import img1 from './components/dist/webImages/1.png';
import { FaPlay } from "react-icons/fa";

function Submission() {
  return (
   <>
   <Header2  />
   <div className="diagramMain">
    <img src={img1} alt="" />
   <div className="playBox my-3 mx-auto flex justify-center items-center">
    <FaPlay />
   </div>
   </div>
   </>
  )
}

export default Submission