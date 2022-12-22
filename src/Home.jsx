import React from 'react';
import Header from './components/common/Header';
import Keyboard from './components/common/Keyboard';
import img1 from './components/dist/webImages/1.png';
import { FaPlay } from "react-icons/fa";

function Home() {
  return (
   <>
   <Header />
   <div className="jeff text-center flex justify-end p-4 ml-auto">
    Today's submission by JEFF
   </div>
   <div className="diagramMain">
    <img src={img1} alt="" />
   <div className="playBox my-3 mx-auto flex justify-center items-center">
    <FaPlay />
   </div>
   </div>
   <Keyboard />
   </>
  )
}

export default Home;