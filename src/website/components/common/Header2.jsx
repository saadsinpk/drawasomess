import React,{useState} from 'react';
import { Link } from "react-router-dom";
import { AiOutlineSetting } from "react-icons/ai";
import { FaBars,FaQuestion} from "react-icons/fa";
import HowToSubmit from './HowToSubmit';

function Header2({settingclicks}) {
    const [submitModal, setsubmitModal] = useState(false);
    const submittoggleClass = (e) => {
        setsubmitModal(true)
      };
      const settintogle = (e) => {
        settingclicks(true);
        };
  return (
    <>
      {submitModal && <HowToSubmit  closesubmirModal={setsubmitModal}   />}  
       
        <div className="header py-2">
          <div className="container flex justify-between items-center gap-1 mx-auto px-4">
              <div className="header__left flex  items-center gap-2">
                  <div className="header__leftnavber">
                      <FaBars />
                  </div>
                  <div className="header__lefttext">
                    <Link to={"/"} >
                    Drawesome
                      <h4>Submissions</h4></Link>
                  </div>
              </div>
              <div className="header__right">
                      <ul className='list flex justify-center gap-2'>
                          <li><a href="#" onClick={submittoggleClass}><FaQuestion /></a></li>
                          <li><a href="#"  onClick={settintogle} ><AiOutlineSetting /></a></li>
                      </ul>
              </div>
          </div>
      </div></>
  )
}

export default Header2