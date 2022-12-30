import React from 'react'

function Userdata({user}) {
  return (
   <ul className='list userData'>
     {user.username &&  <li className='flex gap-1'>
     <div className="userData__left">Name: </div>
        <div className="userData__right">{user.username}</div>
     </li>}
    
     {user.email && <li className='flex gap-1'>
     <div className="userData__left">Email: </div>
        <div className="userData__right">{user.email}</div>
     </li>}
     
     {user.twitter_link && <li className='flex gap-1'>
     <div className="userData__left">Twitter: </div>
        <div className="userData__right">{user.twitter_link}</div>
     </li>}
     {user.instagram_link &&   <li className='flex gap-1'>
     <div className="userData__left">Instagram: </div>
        <div className="userData__right">{user.instagram_link}</div>
     </li>}
   
     {user.tiktok_link &&   <li className='flex gap-1'>
     <div className="userData__left">TikTok: </div>
        <div className="userData__right">{user.tiktok_link}</div>
     </li>}
   
     {user.snapchat_link &&   <li className='flex gap-1'>
     <div className="userData__left">Snapchat: </div>
        <div className="userData__right">{user.snapchat_link}</div>
     </li>}
     {user.created_at &&   <li className='flex gap-1'>
     <div className="userData__left">Date </div>
        <div className="userData__right">{user.created_at}</div>
     </li>}
   
   
   </ul>
  )
}

export default Userdata