import React,{useState,useEffect,useRef, useMemo} from 'react';
import axios from "axios";
import config from "../services/config.json";
import { toast } from "react-toastify";
import {getTokenSession} from "./utils/common";
import Loader from './components/common/Loader';
import Search from './components/common/Search';
import Table from './components/common/Table';
 

function AdminStatistics() {
    const isComponentMounted = useRef(true);
    const [userdata, setUserdata] = useState([]);
    const [totalItem, setTotalItem] = useState(0);
    const [currentPage, setCurrentPage] = useState()
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const tableheader = [
        {
            name: " Word/Phrase",
            feildL: "word"
        },
        {
            name: "Day of the Week",
            feildL: "day"
        },
        {
            name: "Date",
            feildL: "date"
        },
        {
            name: "View Count",
            feildL: "count"
        },
        {
            name: "Games Completed",
            feildL: "completed"
        },
        {
            name: "Fastest Time",
            feildL: "fastest"
        },
        {
            name: "Average Time",
            feildL: "average"
        },
        {
            name: "Link to Photoz",
            feildL: "Photo"
        },
    ];


    useEffect(() => {
      if (isComponentMounted.current) { 
        getData();
      }
      return () => {
        isComponentMounted.current = false;
        setLoading(true);
      }
    }, []);
    const getData = async () => {
        axios.defaults.headers = {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${getTokenSession()}`,
        };
        axios.get(`${config.apiEndPoint}statistics`,)
           .then ((response) => {
            setUserdata(response.data)
             setLoading(false);
          })
          .catch((error) => {
            setLoading(true);
            if (error.response.status === 401)
            toast.error(error.response.data.message);
            else toast.error("Something went wrong. Please try again later.");
          });
      }
      const keys = ["word_phrase","day_of_week","date_today","view_count","games_completed","fastest_time","average_time","link_to_photo"];
      const searchtable = (data) => {
        return data.filter(
            (item) =>
            // keys.some((key) => item[key].toLowerCase().includes(search))
         
                item.word_phrase.toLowerCase().includes(search) ||
                item.day_of_week.toLowerCase().includes(search)
            )
        };
        
      if (loading) return <Loader />;
  return (
   <>
    { }
   <div className="AdminStatistics">
    <div className="AdminStatistics1">
        <div className="container flex gap-4  px-4 py-3">
    <div className="AdminStatistics1Box p-3">
        <ul className='list'>
            <li className='flex justify-between' >
                <div className="AdminStatistics1Box__left">Today’s Date</div>
                <div className="AdminStatistics1Box__right">{userdata.statistics.date_today && userdata.statistics.date_today}</div>
                </li>
            <li className='flex justify-between' >
                <div className="AdminStatistics1Box__left">How many users played today total?</div>
                <div className="AdminStatistics1Box__right">{userdata.statistics.users_played_today && userdata.statistics.users_played_today}</div>
                </li>
            <li className='flex justify-between' >
                <div className="AdminStatistics1Box__left">How many users played complete game?</div>
                <div className="AdminStatistics1Box__right">{userdata.statistics.games_completed_today && userdata.statistics.games_completed_today}</div>
                </li>
            <li className='flex justify-between' >
                <div className="AdminStatistics1Box__left">How many new users currently</div>
                <div className="AdminStatistics1Box__right">{userdata.statistics.new_users_today && userdata.statistics.new_users_today}</div>
                </li>
            <li className='flex justify-between' >
                <div className="AdminStatistics1Box__left">How many players in the last 7 days?</div>
                <div className="AdminStatistics1Box__right">{userdata.statistics.last_7_days_players && userdata.statistics.last_7_days_players}</div>
                </li>
            <li className='flex justify-between' >
                <div className="AdminStatistics1Box__left">How many players in the last 30 days</div>
                <div className="AdminStatistics1Box__right">{userdata.statistics.last_30_days_players && userdata.statistics.last_30_days_players}</div>
                </li>
        </ul>
    </div>
    <div className="AdminStatistics1Box text-center p-5">
   <h2> Today’s Word/Phrase</h2>
    <h5>{userdata.statistics.word_of_day && userdata.statistics.word_of_day}</h5>
    <br />
    <h2>Average guess time</h2>
    <h5>today</h5>
           <h1>{userdata.statistics.average_guess_time_today}</h1> 
    </div>
    </div>
    </div>
    <div className="AdminStatistics2 my-4">
            <div className="AdminStatistics2__top flex justify-around py-2 items-center">
                <div className="searchBox">
                  <input type="text" onChange={(e) => setSearch(e.target.value)} />
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
                  {  
                  tableheader.map(({name},index) =>{
                    return (
                        <th key={index}>{name}</th>

                    )

                    })}
                </tr>
            </thead>
            <tbody>
                <Table data={searchtable(userdata.tabledata)} />
               
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