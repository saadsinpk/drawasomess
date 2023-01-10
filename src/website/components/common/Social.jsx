import React from 'react';
import { FaFacebookF,FaInstagram,FaTwitter,FaTiktok,FaSnapchatGhost } from "react-icons/fa";
import { Link } from "react-router-dom";

function Social({data}) {
  return (
<>
<div className='socailIcon'>
    <ul className='list flex gap-2 justify-center items-center'>
      {data.facebook &&  <li><Link to={data ? data.facebook : "//www.facebook.com/"} target={"_blank"}><FaFacebookF /></Link></li>}  
        <li><a href={data ? (data.instagram_link ? data.instagram_link : "#") : "//www.facebook.com/"} target={"_blank"}><FaInstagram /></a></li>
        <li><Link to={data ? data.twitter_link : "//www.facebook.com/"} target={"_blank"}><FaTwitter /></Link></li>
        <li><Link to={data ? data.tiktok_link : "//www.facebook.com/"} target={"_blank"}><FaTiktok /></Link></li>
      {data && <li><Link to={data ? data.snapchat_link : "//www.facebook.com/"} target={"_blank"}><FaSnapchatGhost /></Link></li>}  
    </ul>
</div>
</>
  )
}

export default Social