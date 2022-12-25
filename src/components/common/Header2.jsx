import React,{useState,useContext} from 'react';
import { AiOutlineSetting } from "react-icons/ai";
import { FaBars,FaQuestion,FaRegSun,FaAlignLeft } from "react-icons/fa";
import HowToSubmit from './HowToSubmit';
import Setting from './Setting';

function Header2() {
    const [settingModal, setsettingModal] = useState(false);
    const [submitModal, setsubmitModal] = useState(false);
    const SettingtoggleClass = (e) => {
      setsettingModal(true)
      };
    const submittoggleClass = (e) => {
        setsubmitModal(true)
      };
  return (
    <>
      {settingModal && <Setting popuptext={"Setting"} closeSetting={setsettingModal}   />}  
      {submitModal && <HowToSubmit  closesubmirModal={setsubmitModal}   />}  
       
        <div className="header py-2">
          <div className="container flex justify-between items-center gap-1 mx-auto px-4">
              <div className="header__left flex  items-center gap-2">
                  <div className="header__leftnavber">
                      <FaBars />
                  </div>
                  <div className="header__lefttext">
                      Drawesome
                      <h4>Submissions</h4>
                  </div>
              </div>
              <div className="header__right">
                      <ul className='list flex justify-center gap-2'>
                          <li><a href="#" onClick={submittoggleClass}><FaQuestion /></a></li>
                          <li><a href="#"  onClick={SettingtoggleClass} ><AiOutlineSetting /></a></li>
                      </ul>
              </div>
          </div>
      </div></>
  )
}

export default Header2