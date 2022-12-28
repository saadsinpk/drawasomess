import React,{useState} from 'react';
import { Link } from "react-router-dom";
import {removeTokenSession} from "../../utils/common";

function AdminNavigation() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const logout = () => {
    removeTokenSession()
    setIsLoggedin(false);
  };
  return (
    <ul className='list flex gap-2'>
        <li><Link to="/admin/">Dashboard</Link></li>
        <li><Link to="/admin/">Setting</Link></li>
        <li><Link to="/admin/">Database</Link></li>
        <li><Link to="/admin/">Statistics</Link></li>
        <li><Link to="/admin/">Email</Link></li>
        <li><butt to="/admin/">Log Out</butt></li>
    </ul>
  )
}

export default AdminNavigation