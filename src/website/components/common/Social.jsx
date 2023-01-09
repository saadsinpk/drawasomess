import React from 'react';
import { FaFacebookF,FaInstagram,FaTwitter,FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";

function Social({data}) {
  return (
<>
<div className='socailIcon'>
    <ul className='list flex gap-2 justify-center items-center'>
        <li><Link to={data ? data.facebook : "http://facebook.com"}><FaFacebookF /></Link></li>
        <li><Link to={data ? data.facebook : "http://facebook.com"}><FaInstagram /></Link></li>
        <li><Link to={data ? data.facebook : "http://facebook.com"}><FaTwitter /></Link></li>
        <li><Link to={data ? data.facebook : "http://facebook.com"}><FaTiktok /></Link></li>
    </ul>
</div>
</>
  )
}

export default Social