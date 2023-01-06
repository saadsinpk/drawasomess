import React, { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import config from "../../../services/config.json";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Header from "./Header";
import Social from './Social';
import Loader from "../../../dashboard/components/common/Loader";
import { getUserToken, removeUserToken } from "../../utils/common";
import { toast } from "react-toastify";

function Topranking({settingclick,data}) {
  const isComponentMounted = useRef(true);
  const [topUser, setTopUser] = useState()
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (isComponentMounted.current) {

      getDataa();
    } 
    return () => {
      isComponentMounted.current = false;
      setLoading(true);
    };
  }, []);
  const getDataa = async () => {
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getUserToken()}`,
      };
  axios.get(`${config.apiEndPoint2}top30Players`)
      .then((response) => {
        setTopUser(response.data.scores)
        setLoading(false);
      })
      .catch((error) => {
        removeUserToken("usertoken");
        if (error?.response?.status === 500) {
          removeUserToken("usertoken");
        } else if (error?.response?.status === 401) {
          setLoading(true);
          toast.error(error.response.data.message);
        } else {
          setLoading(true);
          toast.error("Something went wrong. Please try again later.");
        }
      });
    }
      if (loading) return <Loader />;

  return (
    <>
      <Header settingclicks={settingclick} ele={data}  />
    <div  className={'topranking'}>
     <div className="StatisticsMain-top p-2 flex items-center">
         <Link to="/" className="StatisticsMain-top-left">
             <AiOutlineArrowLeft />
         </Link>
         {topUser.length &&  <h2 className="heading-right mx-auto my-0">Today’s Top {topUser.length} Players</h2>}
        
     </div>
     <div className='section1'>
   
            <div className="section1__list mt-5">
                <ul className='list'>
                {topUser &&  topUser.map((item,index) => {
        return (
            <li key={index} className='flex justify-between items-center'>
                        <div className="section1__list-left">
                            <span>{++index}. </span>{item.username}
                        </div>
                        <div className="section1__list-right">
                            {item.game_complete_time}
                        </div>
                        </li>
        );
      })}
                  
                   
                </ul>
            </div>
            <div className="section1Box section1Box3 my-2">
            <div className='flowBox text-center'>
                <h2 className='mb-2'>Follow us below</h2>
                <Social />
            </div>
            </div>
     </div>
     </div>
     </>
  )
}

export default Topranking