import React from 'react';
import { Link } from "react-router-dom";
import { removeTokenSession,getTokenSession } from "../../utils/common";

function AdminHeader({ logoutfun }) {
   const  removetoken = () => {
    logoutfun(false)
    }
  return (
 <div className='adminHeader'>
    <div className="container px-4 flex justify-between items-center">
        <div className="adminHeader__Logo">
            <h2>Drawesome</h2>
        </div>
        {logoutfun &&  <div className="adminHeader--right">
        <ul className='list flex gap-2'>
        <li><Link to="admin/dashboard">Dashboard</Link></li>
        <li><Link to="setting">Setting</Link></li>
        <li><Link to="dashboard">Database</Link></li>
        <li><Link to="statistics">Statistics</Link></li>
        <li><Link to="admin">Email</Link></li>
        <li><button onClick={removetoken} >Log Out</button></li>
    </ul>
        </div>}
       
    </div>
 </div>
  )
}

export default AdminHeader