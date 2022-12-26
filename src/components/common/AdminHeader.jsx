import React from 'react';
import { Link } from "react-router-dom";

function AdminHeader({ data }) {
  return (
 <div className='adminHeader'>
    <div className="container px-4">
        <div className="adminHeader__Logo">
            <h2>Drawesome</h2>
        </div>
        {data.token &&  <div className="adminHeader--right">
        <ul className='list flex gap-2'>
        <li><Link to="/admin/">Dashboard</Link></li>
        <li><Link to="/admin/">Setting</Link></li>
        <li><Link to="/admin/">Database</Link></li>
        <li><Link to="/admin/">Statistics</Link></li>
        <li><Link to="/admin/">Email</Link></li>
        <li><Link to="/admin/">Log Out</Link></li>
    </ul>
        </div>}
       
    </div>
 </div>
  )
}

export default AdminHeader