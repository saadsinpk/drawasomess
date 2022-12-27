import React from 'react'

function AdminStatistics() {
  return (
   <>
   <div className="AdminStatistics">
    <div className="AdminStatistics1">
        <div className="container flex gap-4  px-4 py-3">
    <div className="AdminStatistics1Box p-3">
        <ul className='list'>
            <li className='flex justify-between' >
                <div className="AdminStatistics1Box__left">Today’s Date</div>
                <div className="AdminStatistics1Box__right">Mon 12/19/2022</div>
                </li>
            <li className='flex justify-between' >
                <div className="AdminStatistics1Box__left">How many users played today total?</div>
                <div className="AdminStatistics1Box__right">330</div>
                </li>
            <li className='flex justify-between' >
                <div className="AdminStatistics1Box__left">How many users played complete game?</div>
                <div className="AdminStatistics1Box__right">275</div>
                </li>
            <li className='flex justify-between' >
                <div className="AdminStatistics1Box__left">How many new users currently</div>
                <div className="AdminStatistics1Box__right">150</div>
                </li>
            <li className='flex justify-between' >
                <div className="AdminStatistics1Box__left">How many players in the last 7 days?</div>
                <div className="AdminStatistics1Box__right">1150</div>
                </li>
            <li className='flex justify-between' >
                <div className="AdminStatistics1Box__left">How many players in the last 30 days</div>
                <div className="AdminStatistics1Box__right">3000</div>
                </li>
        </ul>
    </div>
    <div className="AdminStatistics1Box text-center p-5">
   <h2> Today’s Word/Phrase</h2>
    <h5>“Alpha Dog”</h5>
    <br />
    <h2>Average guess time</h2>
    <h5>today</h5>

    </div>
    </div>
    </div>
    <div className="AdminStatistics2 my-4">
            <div className="AdminStatistics2__top flex justify-around py-2 items-center">
                <div className="searchBox">
                    <input type="text" placeholder='search' />
                </div>
                <div className="userdata">
                User data
                </div>
            </div>
            <div className="AdminStatistics2__bottom">
           <div className="tableScroll">
           <table className="table">
            <thead>
                <tr>
                    <th></th>
                    <th> Word/Phrase</th>
                    <th>Day of the Week</th>
                    <th>Date</th>
                    <th>View Count</th>
                    <th>Games Completed</th>
                    <th>Fastest Time</th>
                    <th>Average Time</th>
                    <th>Link to Photoz</th>
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
                </tr>
            </tbody>

           </table>
           </div>
            </div>
    </div>
   </div>
   </>
  )
}

export default AdminStatistics