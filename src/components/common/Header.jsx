import React,{useState} from 'react';
import { AiOutlineSetting } from "react-icons/ai";
import { FaBars,FaQuestion,FaRegSun,FaAlignLeft } from "react-icons/fa";
import Congratulations from './Congratulations';
import HowToPlay from './HowToPlay';
import Setting from './Setting';
import Statistics from './Statistics';
import Topranking from './Topranking';

function Header() {
    const [setting, setSetting] = useState(false);
    const [statistics, setStatistics] = useState(false);
    const [congratulations, setCongratulations] = useState(false);
    const [play, setPlay] = useState(false);
    const SettingtoggleClass = (e) => {
        e.preventDefault();
        const settings = document.querySelector(".Setting");
        setSetting(!setting);
      //   if(setting) {
      //     settings.classList.add("active")
      // }
      // else {
      //   settings.classList.remove("active")
      // }
      };
    const StatisticstoggleClass = (e) => {
        e.preventDefault();
        setStatistics(!statistics);
      };
   
    const PlaystoggleClass = (e) => {
        e.preventDefault();
        setPlay(!play);
      };
  return (
    <>
    <HowToPlay play={play ? 'active': null} />
       <Setting popuptext={"Setting"}   />
       <Statistics popuptext={"Statistics"} statistics={statistics ? 'active': null}  />
       <Congratulations popuptext={"Congratulations"} congratulations={congratulations ? 'active': null}  />
       <Topranking popuptext={"Today’s Top 30 Players"} congratulations={congratulations ? 'active': null}  />
       <div className="header py-2">
        <div className="container flex justify-between items-center gap-1 mx-auto px-4">
            <div className="header__left flex  items-center gap-2">
                <div className="header__leftnavber">
                    <FaBars />
                </div>
                <div className="header__lefttext">
                    Drawesome
                </div>
            </div>
            <div className="header__right">
                    <ul className='list flex justify-center gap-2'>
                        <li><a href="#" onClick={PlaystoggleClass}><FaQuestion /></a></li>
                        <li><a href="#" onClick={StatisticstoggleClass}><FaAlignLeft /></a></li>
                        <li><a href="#" className={setting ? 'active': null}  onClick={SettingtoggleClass} ><AiOutlineSetting /></a></li>
                    </ul>
            </div>
        </div>
    </div></>
 
  )
}

export default Header;