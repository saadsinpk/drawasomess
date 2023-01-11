  import React,{useState} from 'react';
  import { Link } from "react-router-dom";
  import { AiOutlineSetting } from "react-icons/ai";
  import { FaBars,FaQuestion,FaAlignLeft } from "react-icons/fa";
  import HowToPlay from './HowToPlay';
  import Statistics from './Statistics';

  function Header({settingclicks}) {  
    const [statisticsModal, setStatisticsModal] = useState(false);
    const [play, setPlay] = useState(false);
    const [openModal, setOpenModal] = useState("");
        const StatisticstoggleClass = (e) => {
          setStatisticsModal(true);
        };
    
      const PlaystoggleClass = (e) => {
          setPlay(true);
        };
      const settintogle = (e) => {
        settingclicks(true);
        };
    return (
      <>
    {play && <HowToPlay closePlay={setPlay} />} 
   
       {statisticsModal &&  <Statistics popuptext={"Statistics"} closeStatistics={setStatisticsModal}   />}
         <div className="header py-2">
          <div className="container flex justify-between items-center gap-1 mx-auto px-4">
              <div className="header__left flex  items-center gap-2">
                  <div className="header__leftnavber">
                      <FaBars />
                  </div>
                  <div className="header__lefttext">
                      <Link to={"/"}>Drawesome</Link>
                  </div>
              </div>
              <div className="header__right">
                      <ul className='list flex justify-center gap-2'>
                          <li><a href="#" onClick={PlaystoggleClass}><FaQuestion /></a></li>
                          <li><a href="#" onClick={StatisticstoggleClass}><FaAlignLeft /></a></li>
                          <li><a href="#"  onClick={settintogle} ><AiOutlineSetting /></a></li>
                      </ul>
              </div>
          </div>
      </div></>
  
    )
  }

  export default Header;