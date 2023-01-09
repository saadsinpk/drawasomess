import React,{useState} from 'react';
import { Link } from "react-router-dom";
import Header from './components/common/Header';
import Keyboard from './components/common/Keyboard';
import img1 from '../dist/webImages/1.png';
import { FaPlay } from "react-icons/fa";

function Home({data,settingclick,gameto}) {
  const [stopKeyboard, setStopKeyboard] = useState(false);
  const handlestopKeyboard = () => {
    setStopKeyboard(true)
  }
  return (
   <>
   <Header keyboa={handlestopKeyboard} settingclicks={settingclick} ele={data}  />
   <div className="jeff text-center flex justify-end p-4 ml-auto">
    {gameto ?  <Link to={"/playby"}>Today's submission by JEFF </Link> : 
    <p>Today's submission by JEFF
      </p>}
   
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