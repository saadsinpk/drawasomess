import React from 'react'

function Userdata({user}) {
  return (
   <ul className='list userData'>
      {/* {userdata.map((item, index) => (
    <li className=''>
        <div className="userData__left">{item.</div>
        <div className="userData__right"></div>
    </li>
     ))} */}
     {user.Name &&  <li className='flex gap-1'>
     <div className="userData__left">Name: </div>
        <div className="userData__right">{user.Name}</div>
     </li>}
    
     {user.Email && <li className='flex gap-1'>
     <div className="userData__left">Email: </div>
        <div className="userData__right">{user.Email}</div>
     </li>}
     
     {user.Twitter && <li className='flex gap-1'>
     <div className="userData__left">Twitter: </div>
        <div className="userData__right">{user.Twitter}</div>
     </li>}
     {user.Instagram &&   <li className='flex gap-1'>
     <div className="userData__left">Instagram: </div>
        <div className="userData__right">{user.Instagram}</div>
     </li>}
   
     {user.TikTok &&   <li className='flex gap-1'>
     <div className="userData__left">TikTok: </div>
        <div className="userData__right">{user.TikTok}</div>
     </li>}
   
     {user.PreviousEntry &&   <li className='flex gap-1'>
     <div className="userData__left">Previous Entry: </div>
        <div className="userData__right">{user.PreviousEntry}</div>
     </li>}
   
    {user.ShareUsername && <li className='flex gap-1'>
     <div className="userData__left">Share Username: </div>
        <div className="userData__right">{user.ShareUsername}</div>
     </li>} 
     {user.ShareSocial  &&     <li className='flex gap-1'>
     <div className="userData__left">Share Social: </div>
        <div className="userData__right">{user.ShareSocial}</div>
     </li>}
 
   </ul>
  )
}

export default Userdata