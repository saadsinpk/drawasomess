  import React,{useState,useContext} from 'react';
  import { Link } from "react-router-dom";
  import { AiOutlineSetting } from "react-icons/ai";
  import { FaBars,FaQuestion,FaRegSun,FaAlignLeft } from "react-icons/fa";
  import Congratulations from '../../Congratulations';
  import HowToPlay from './HowToPlay';
  import Setting from './Setting';
  import Statistics from './Statistics';
  import Topranking from './Topranking';
  import Faq from '../../Faq';
  import UserModal from '../../UserModal';
  import HowToSubmit from './HowToSubmit';

  function Header({keyboa,settingclicks}) {  
    const [userModal, setUserModal] = useState(false);
    const [howToSubmit, setHowToSubmit] = useState(false);
    const [statisticsModal, setStatisticsModal] = useState(false);
    const [congratulationsModal, setCongratulationsModal] = useState(false);
    const [play, setPlay] = useState(false);
    const [openModal, setOpenModal] = useState("");
   
        const StatisticstoggleClass = (e) => {
          setStatisticsModal(true);
        };
    
      const PlaystoggleClass = (e) => {
          setPlay(true);
        };
      const UserModaltoggle = (e) => {
        setUserModal(true);
        };
      const settintogle = (e) => {
        settingclicks(true);
        };
    return (
      <>
      {/* <HowToSubmit   /> */}
         {userModal && <UserModal closeUserModal={UserModaltoggle}  />}  
      {/* <Faq  popuptext={"PLAYER FAQ"}   /> */}
    {play && <HowToPlay closePlay={setPlay} />} 
   
       {statisticsModal &&  <Statistics popuptext={"Statistics"} closeStatistics={setStatisticsModal}   />}
        {/* <Congratulations popuptext={"Congratulations"} closeCongratulations={setCongratulationsModal}  /> */}
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