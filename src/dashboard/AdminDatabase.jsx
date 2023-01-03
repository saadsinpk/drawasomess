import React,{useState,useEffect,useRef} from 'react';
import axios from "axios";
import config from "../services/config.json";
import {getTokenSession} from "./utils/common";
import { toast } from "react-toastify";
import Loader from './components/common/Loader';
import Table2 from './components/common/Table2';

function AdminDatabase() {
    const [userdata, setUserdata] = useState([]);
    const [updated, setupdated] = useState(false);
    const isComponentMounted = useRef(true);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [switchs, setSwitchs] = useState(false);
    const setSwitchstoggle = (e) => {
        };
   
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
        axios.get(`${config.apiEndPoint}getAllUsers`,)
        .then ((response) => {
            setLoading(false)
            setUserdata(response.data.users);
    
        })
        .catch((error) => {
          setLoading(true);
          if (error.response.status === 401)
          toast.error(error.response.data.message);
          else toast.error("Something went wrong. Please try again later.");
        });
    }
    const searchtable = (data) => {
        return data.filter(
            (item) =>
         
                item.email.toLowerCase().includes(search) ||
                item.username.toLowerCase().includes(search) ||
                item.username.toLowerCase().includes(search) 
            )
        };
      const  handlesave = (item,swit) => {
        let itemid = item.id;
        let activeis = swit;
        axios.defaults.headers = {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${getTokenSession()}`,
          };
          axios.put(`${config.apiEndPoint}changeUserStatus/`,{
            "userId": item.id,
            "active":  activeis
          })
          .then((response) => {
            if(response) {
              toast.success(response.message)
            }
        })
      }
    if (loading) return <Loader />;
  return (
    <div className="AdminDatabase my-4">
          <div className="AdminStatistics2__top flex justify-around py-2 items-center">
                <div className="searchBox">
                <input type="text" onChange={(e) => setSearch(e.target.value)} />
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
     <Table2 saved={handlesave} switches={setSwitchstoggle} data={searchtable(userdata)} />
     </tbody>

    </table>
    </div>
    </div>
    </div>
  )
}

export default AdminDatabase