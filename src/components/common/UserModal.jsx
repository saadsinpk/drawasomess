import React from 'react';
import { AiOutlineArrowLeft } from "react-icons/ai";

function UserModal() {
  return (
    <div  className="Modal">
    <div className="Modal__heading p-2 flex items-center">
    <div className="Modal__heading--left"><AiOutlineArrowLeft /></div>
    </div>
    <div className="Modal__body p-3">
        <input type="text" className='block inputdesign w-100 mb-4'  />

        <button className='btn btn-primary mx-auto my-2 block'>Submit</button>

        <p>Please enter your game username to see if you ranked top 30 today.</p>
        <p>if you do not wish to enter a username , please click <a href="#">here</a> to see result without your ranking</p>
    </div>
    </div>
  )
}

export default UserModal