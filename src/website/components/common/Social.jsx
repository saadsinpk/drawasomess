import React from 'react';
import { FaFacebookF,FaInstagram,FaTwitter,FaTiktok } from "react-icons/fa";

function Social() {
  return (
<>
<div className='socailIcon'>
    <ul className='list flex gap-2 justify-center items-center'>
        <li><a href="#"><FaFacebookF /></a></li>
        <li><a href="#"><FaInstagram /></a></li>
        <li><a href="#"><FaTwitter /></a></li>
        <li><a href="#"><FaTiktok /></a></li>
    </ul>
</div>
</>
  )
}

export default Social