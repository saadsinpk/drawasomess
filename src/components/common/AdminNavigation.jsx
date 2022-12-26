import React from 'react';
import { Link } from "react-router-dom";

function AdminNavigation() {
  return (
    <ul className='list flex gap-2'>
        <li><Link to="/admin/">Dashboard</Link></li>
        <li><Link to="/admin/">Setting</Link></li>
        <li><Link to="/admin/">Database</Link></li>
        <li><Link to="/admin/">Statistics</Link></li>
        <li><Link to="/admin/">Email</Link></li>
        <li><Link to="/admin/">Log Out</Link></li>
    </ul>
  )
}

export default AdminNavigation