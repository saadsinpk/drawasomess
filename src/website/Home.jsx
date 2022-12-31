import React,{useState} from 'react';
import { Link } from "react-router-dom";
import Header from './components/common/Header';
import Keyboard from './components/common/Keyboard';
import img1 from '../dist/webImages/1.png';
import { FaPlay } from "react-icons/fa";

function Home() {
  const [stopKeyboard, setStopKeyboard] = useState(false);
  console.log(stopKeyboard)
  const handlestopKeyboard = () => {
    setStopKeyboard(true)
    console.log(stopKeyboard,"dfhjkj")
  }
  return (
   <>
   <Header keyboa={handlestopKeyboard}  />
   <div className="jeff text-center flex justify-end p-4 ml-auto">
    
    <Link to={"/playby"}>Today's submission by JEFF </Link>
   </div>
   <div className="diagramMain">
    <img src={img1} alt="" />
   <div className="playBox my-3 mx-auto flex justify-center items-center">
    <FaPlay />
   </div>
   </div>
   <Keyboard keyboa={handlestopKeyboard} />
   </>
  )
}

export default Home;