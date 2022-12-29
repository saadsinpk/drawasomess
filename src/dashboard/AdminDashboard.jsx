import React,{useState,useEffect,useRef} from 'react';
import axios from "axios";
import config from "../services/config.json";
import AdminEntries from './components/AdminEntries'
import AdminHeader from './components/common/AdminHeader'
import Userdata from './components/Userdata';
import { AiFillHeart,AiOutlineClose } from "react-icons/ai";
import {getTokenSession,getidSession} from "./utils/common";
import { toast } from "react-toastify";
import Loader from './components/common/Loader';


function AdminDashboard() {
    const [data, setData] = useState("");
    const [updated, setupdated] = useState("")
    const isComponentMounted = useRef(true);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      if (isComponentMounted.current) { 
        getData();
       
      }
      return () => {
        isComponentMounted.current = false;
        setLoading(true);
      }
    }, []);
    const [adminEntrieslist, setAdminEntrieslist] = useState("");
    const [savedEntrieslist, setSavedEntrieslist] = useState("");
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
const getData = async () => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      "Authorization":`Bearer ${getTokenSession()}`,
    };
    axios.get(`${config.apiEndPoint}dashboard`,)
    .then ((response) => {
        setLoading(false);
        setData(response.data);
        const AdminEntriesupdate = response.data.entries.filter((item) => item.saved == "0");
        const savedEntriesupdate = response.data.entries.filter((item) => item.saved != "0");
        setAdminEntrieslist(AdminEntriesupdate)
        setSavedEntrieslist(savedEntriesupdate)

    })
    .catch((error) => {
      setLoading(true);
      if (error.response.status === 401)
      toast.error(error.response.data.message);
      else toast.error("Something went wrong. Please try again later.");
    });
}

if (loading) return <Loader />;

const handlesavedEntries  = async (e) => {
   
    axios.defaults.headers = {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${getTokenSession()}`,
      };
      axios.post(`${config.apiEndPoint}updateEntry/${e.target.id}`,
      {
        "updateValue": false
    })
     .then((response) => {
        
      
       
     })
     .catch((error) => {
       if (error.response.status === 401) toast.error(error.response.data.message);
       else toast.error("Something went wrong. Please try again later.");
     });
 
  };
  const handleEntrieslist =  (e) => {
    // const savedEntriesupdate = adminEntrieslist.filter((item) => item.id !== e.target.id);
    // const adminEntrieslistdate = adminEntrieslist.filter((item) => item.id == e.target.id);
    // setSavedEntrieslist([...savedEntrieslist,adminEntrieslistdate[0]]);
    // setAdminEntrieslist(savedEntriesupdate);
  
    axios.defaults.headers = {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${getTokenSession()}`,
      };
      axios.post(`${config.apiEndPoint}updateEntry/${e.target.id}`,
      {
        "updateValue": true
    })
    .then((response) => {
        if(response) {
            getData();
        }
    })
    .catch((error) => {
        if (error.response.status === 401) toast.error(error.response.data.message);
        else toast.error("Something went wrong. Please try again later.");
      });
   
 
  }
  const handlelistdelete = (e) => {
    const listdelete = adminEntrieslist.filter((item) => item.id !== e.target.getAttribute('data-delete'));
    setAdminEntrieslist(listdelete);

  }

  return (
    <>
     <div className='aadmindasboard my-2 grid grid-cols-3'>
    <div className="aadmindasboard__left">
    <div className="AdminEntries mb-3">
    <div className="AdminEntries__top adminheading text-center">
    {"New Entries"}
    </div>
    <div className="AdminEntries__bottom">
        <ul className='list adminlist'>
        {adminEntrieslist.map((item, index) => (
        <li className="list__item flex gap-2 items-center justify-between" key={index}>
          <div>
                    <span>Username</span>
                    <span>{item.username}</span>
                </div>
                <div>
                    <span>Submission Date</span>
                    <span>{item.submissiondate}</span>
                </div>
                 <div className='heart'>
                <button id={item.user_id} onClick={handleEntrieslist}>
                    H 
                    {/* <AiFillHeart /> */}
                </button>
                </div>
              
                <button className='closebtn' data-delete={item.user_id} onClick={handlelistdelete} >
                    X
                </button>
        </li>
      ))}
        </ul>
    </div>
   </div>
        <div className="AdminEntries mb-3">
    <div className="AdminEntries__top adminheading text-center">
    {"Saved Entries"}
    </div>
    <div className="AdminEntries__bottom">
        <ul className='list adminlist'>
        {savedEntrieslist.map((item, index) => (
        <li className="list__item flex gap-2 items-center justify-between" key={index}>
          <div>
                    <span>Username</span>
                    <span>{item.username}</span>
                </div>
                <div>
                    <span>Submission Date</span>
                    <span>{item.submissiondate}</span>
                </div>
            
              
                <button className='closebtn' id={item.user_id} onClick={handlesavedEntries}>
               X
                </button>
        </li>
      ))}
        </ul>
    </div>
   </div>
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