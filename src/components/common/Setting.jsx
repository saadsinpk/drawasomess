import React from 'react';
import { AiOutlineArrowLeft } from "react-icons/ai";
import Social from './Social';

function Setting() {
  return (
   <div className="Setting">
    <div className="heading p-2 flex items-center">
    <div className="heading-left">
            <AiOutlineArrowLeft />
    </div>
    <h2 className="heading-right mx-auto my-0">Setting</h2>
    </div>
    <div className="userList my-5">
        <ul className='list'>
            <li className='flex justify-between py-2 px-2'>
                <div className='userList__left'>UserName</div>
                <div className='userList__right'>DavidU</div>
            </li>
            <li className='flex justify-between py-2 px-2'>
                <div className='userList__left'>Dark Theme</div>
                <div className='userList__right'>UserName</div>
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