import React, { useState } from 'react';
import { AiOutlineArrowLeft } from "react-icons/ai";
import Switch from './form/Switch';
import Social from './Social';

function Setting({popuptext}) {
    const [modal, setModal] = useState(false);
    const removeModal = (e) => {
        setModal(!modal);
        const setting = document.querySelector(".Setting");
        if(modal) {
            setting.classList.add("active")
        }
        else {
            setting.classList.remove("active")
        }
    }
  return (
   <div  className={'Setting'}>
    <div className="heading p-2 flex items-center">
    <div className="heading-left" onClick={removeModal}>
            <AiOutlineArrowLeft />
    </div>
    <h2 className="heading-right mx-auto my-0">{popuptext}</h2>
    </div>
    <div className="userList my-5">
        <ul className='list'>
            <li className='flex justify-between py-2 px-2'>
                <div className='userList__left'>UserName</div>
                <div className='userList__right'>DavidU</div>
            </li>
            <li className='flex justify-between py-2 px-2'>
                <div className='userList__left'>Dark Theme</div>
                <div className='userList__right'>
                    <Switch />
                </div>
            </li>
            <li className='flex justify-between py-2 px-2'>
                <div className='userList__left'>Feedback</div>
                <div className='userList__right'>Email</div>
            </li>
            <li className='flex justify-between py-2 px-2'>
                <div className='userList__left'>Questions?</div>
                <div className='userList__right'>FAQ</div>
            </li>
        </ul>
    </div>
    <br />
    <div className='flowBox text-center'>
                <h2 className='mb-3'>Follow us below</h2>
                <Social />
            </div>
   </div>
  )
}

export default Setting