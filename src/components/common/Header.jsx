  import React,{useState,useContext} from 'react';
  import $ from "jquery";
  import { AiOutlineSetting } from "react-icons/ai";
  import { FaBars,FaQuestion,FaRegSun,FaAlignLeft } from "react-icons/fa";
  import Congratulations from './Congratulations';
  import HowToPlay from './HowToPlay';
  import Setting from './Setting';
  import Statistics from './Statistics';
  import Topranking from './Topranking';
  import Faq from './Faq';
  import UserModal from './UserModal';
  import HowToSubmit from './HowToSubmit';

  function Header() {
      const [settingModal, setsettingModal] = useState(false);
      const [howToSubmit, setHowToSubmit] = useState(false);
      const [statistics, setStatistics] = useState(false);
      const [congratulations, setCongratulations] = useState(false);
      const [play, setPlay] = useState(false);
      const SettingtoggleClass = (e) => {
        setsettingModal(true)
        };
        const StatisticstoggleClass = (e) => {
          e.preventDefault();
          $(".StatisticsPage").toggleClass('active');
        };
    
      const PlaystoggleClass = (e) => {
          setPlay(true);
        };
    return (
      <>
      {/* <HowToSubmit   /> */}
     {/* {howToSubmit && <HowToSubmit   />}  */}
           {/* <UserModal popuptext={"Setting"}  /> */}
      {/* <Faq  popuptext={"PLAYER FAQ"}   /> */}
    {play && <HowToPlay closePlay={setPlay} />} 
      {settingModal && <Setting popuptext={"Setting"} closeSetting={setsettingModal}   />}  
        <Statistics popuptext={"Statistics"}   />
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
                          <li><a href="#"  onClick={SettingtoggleClass} ><AiOutlineSetting /></a></li>
                      </ul>
              </div>
          </div>
      </div></>
  
    )
  }

  export default Header;