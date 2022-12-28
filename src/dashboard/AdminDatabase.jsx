import React, { useState } from 'react';

function AdminDatabase() {
    const [switchs, setSwitchs] = useState(false);
    const Switchtoggle = (e) => {
        setSwitchs(!switchs);
    }
  return (
    <div className="AdminDatabase my-4">
          <div className="AdminStatistics2__top flex justify-around py-2 items-center">
                <div className="searchBox">
                    <input type="text" placeholder='search' />
                </div>
                <div className="userdata">
                User data
                </div>
            </div>
            <div className="AdminDatabase__bototm">
    <div className="tableScroll">
    <table className="table">
     <thead>
         <tr>
             <th></th>
             <th>Username</th>
             <th> Email</th>
             <th>TikTok</th>
             <th>Twitter</th>
             <th>Instagram</th>
             <th>Facebook</th>
             <th>Share User</th>
             <th>Share Social</th>
             <th>Creation Date</th>
             <th>Active</th>
             <th>IP Address</th>
             <th></th>
         </tr>
     </thead>
     <tbody>
         <tr>
             <td><input type="checkbox" /></td>
             <td></td>
             <td></td>
             <td></td>
             <td></td>
             <td></td>
             <td></td>
             <td></td>
             <td></td>
             <td></td>
             <td>
             <div className="relative flex flex-col items-center justify-center overflow-hidden">
    <div className="flex">
        <label className="inline-flex relative items-center cursor-pointer">
            <input type="checkbox"  onClick={Switchtoggle} className="sr-only peer" checked={switchs && true} />
            <div  className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
            ></div>
        </label>
    </div>
</div>
             </td>
             <td></td>
             <td> <button className='btn btn-primary'>Save</button></td>
         </tr>
     </tbody>

    </table>
    </div>
    </div>
    </div>
  )
}

export default AdminDatabase