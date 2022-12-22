import React,{useState} from 'react';
import { AiOutlineSetting } from "react-icons/ai";
import { FaBars,FaQuestion,FaRegSun,FaAlignLeft } from "react-icons/fa";
import Congratulations from './Congratulations';
import Setting from './Setting';
import Statistics from './Statistics';
import Topranking from './Topranking';

function Header() {
    const [setting, setSetting] = useState(false);
    const [statistics, setStatistics] = useState(false);
    const [congratulations, setCongratulations] = useState(false);
    const SettingtoggleClass = (e) => {
        e.preventDefault();
        setSetting(!setting);
      };
    const StatisticstoggleClass = (e) => {
        e.preventDefault();
        setStatistics(!statistics);
      };
    const CongratulationstoggleClass = (e) => {
        e.preventDefault();
        setCongratulations(!congratulations);
      };
  return (
    <>
       <Setting popuptext={"Setting"} setting={setting ? 'active': null}  />
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
                        <li><a href="#"><FaQuestion /></a></li>
                        <li><a href="#" onClick={StatisticstoggleClass}><FaAlignLeft /></a></li>
                        <li><a href="#" className={setting ? 'active': null}  onClick={SettingtoggleClass} ><AiOutlineSetting /></a></li>
                    </ul>
            </div>
        </div>
    </div></>
 
  )
}

export default Header;