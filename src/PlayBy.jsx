import React from 'react'
import Header from './components/common/Header';
import Keyboard from './components/common/Keyboard';
import img1 from './components/dist/webImages/1.png';
import { FaPlay } from "react-icons/fa";
import Social from './components/common/Social';

function PlayBy() {
  return (
    <>
    <Header  />
    <div className='my-2'>
    <Social />
    </div>
    <div className="diagramMain">
    <img src={img1} alt="" />
   <div className="playBox my-3 mx-auto flex justify-center items-center">
   
   </div>
   </div>
   <Keyboard />
    </>  )
}

export default PlayBy