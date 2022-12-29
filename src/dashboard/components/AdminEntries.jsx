import React from 'react';
import { AiFillHeart,AiOutlineClose } from "react-icons/ai";

function AdminEntries({proptext,AdminEntriesdata}) {
    
  return (
   <div className="AdminEntries mb-3">
    <div className="AdminEntries__top adminheading text-center">
    {proptext}
    </div>
    <div className="AdminEntries__bottom">
        <ul className='list adminlist'>
        {AdminEntriesdata.map((item, index) => (
        <li className="list__item flex gap-2 items-center justify-between" key={item.id}>
          <div>
                    <span>Username</span>
                    <span>{item.username}</span>
                </div>
                <div>
                    <span>Submission Date</span>
                    <span>{item.submissiondate}</span>
                </div>
                {item.like &&  <div className='heart'>
                <button><AiFillHeart /></button>
                </div>}
              
                <button className='closebtn'>
                <AiOutlineClose />
                </button>
        </li>
      ))}
        </ul>
    </div>
   </div>
  )
}

export default AdminEntries