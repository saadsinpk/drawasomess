import React from 'react';
import AdminEntries from '../../components/AdminEntries'
import AdminHeader from '../../components/common/AdminHeader'
import Userdata from '../../components/Userdata';


function AdminDashboard() {
    const AdminEntrieslist = [
        {
            "username": "abc",
            "submissiondate": "Monday 12/18/2022",
            "like": true
        },
        {
            "username": "abc",
            "submissiondate": "Monday 12/18/2022",
            "like": true
        }
    ];
    const SavedEntrieslist = [
        {
            "username": "abc",
            "submissiondate": "Monday 12/18/2022",
            "like": true
        },
        {
            "username": "abc",
            "submissiondate": "Monday 12/18/2022",
            "like": true
        }
    ];
    const userdata = 
       { "Name":" DeannaK",
"Email":" DeannaK@yahoo.com",
"Twitter":" DeannaB",
"Instagram":" DeannaB",
"TikTok":" DeannaK",
"PreviousEntry": "N",
"ShareUsername": "Y",
"ShareSocial": "N"}
const upcomingenteries = [
    {
        title: "Tues December 20th 2022",
    },
];
  return (
    <>
     <div className='aadmindasboard my-2 grid grid-cols-3'>
    <div className="aadmindasboard__left">
        <AdminEntries proptext="New Entries" AdminEntriesdata={AdminEntrieslist}  />
        <AdminEntries proptext="Saved Entries" AdminEntriesdata={SavedEntrieslist}  />
        {/* <AdminEntries proptext="New Entries" /> */}
    </div>
    <div className="aadmindasboard__center  p-5">
    <div className='paintBox'></div>
    <div className='aadmindasboard__center- flex justify-between items-center gap-2 my-3 px-5'> 
        <div className='timeBox'>60</div>
        <div className='aadmindasboard__center-center'>
      <span className='block' style={{fontSize:"10px"}}>  Button Frame</span>
      <div className=' gap-1'>
        <button className='btn btn-pink block w-100 my-1'>Play</button>
        <button className='btn btn-pink block w-100 my-1'>Pause</button>

      </div>
        </div>
        <div className="aadmindasboard__center-right">
            <h4>Word / </h4>
            <h4>Phrase </h4>
            <h5>PLANTS</h5>
        </div>
        </div>
        {<Userdata user={userdata} /> }
    </div>
    <div className="aadmindasboard__right">
        <div className="UpcomingEntrie">
        <div className="AdminEntries__top adminheading text-center">
    Upcoming Entries
    </div>
    <div className="UpcomingEntrie__bottom">
        <ul className='list'>
        {upcomingenteries.map((item, index) => (
            <li key={index} className="text-center">{item.title}</li>
            ))}
        </ul>
        <button className='btn btn-sky text-center w-100'>Save</button>
    </div>
        </div>
  
    </div>
   </div></>
  )
}

export default AdminDashboard