import React,{useEffect, useRef, useState} from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../services/config.json";
import Header from './components/common/Header';
import Keyboard from './components/common/Keyboard';
import img1 from '../dist/webImages/1.png';
import { FaPlay } from "react-icons/fa";
import Loader from '../dashboard/components/common/Loader';
import { toast } from "react-toastify";
import { getUserToken, removeUserToken } from './utils/common';

function Home({data,settingclick,gameto,ga}) {
  const [stopKeyboard, setStopKeyboard] = useState(false);
  const [loading, setLoading] = useState(true);
  const isComponentMounted = useRef(true);
  useEffect(() => {
    if (isComponentMounted.current) {
      getDatass();  
    
    }
    return () => {
      isComponentMounted.current = false;
      setLoading(true);
    };
  }, []);
  const getDatass = async () => {
      axios.defaults.headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getUserToken()}`,
      };
  axios.get(`${config.apiEndPoint2}getTodaysGame`)
      .then((response) => {
        ga({
          "user_id": response.data.todays_game.user_id,
          "entry_id": response.data.todays_game.entry_id
        })
        setLoading(false)
      
       
      })
      .catch((error) => {
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
  const handlestopKeyboard = () => {
    setStopKeyboard(true)
  }
  return (
   <>
   <Header keyboa={handlestopKeyboard} settingclicks={settingclick} ele={data}  />
   <div className="jeff text-center flex justify-end p-4 ml-auto">
    {gameto == "1" ?  <Link to={"/playby"}>Today's submission by JEFF </Link> : 
    <p>Today's submission by JEFF
      </p>}
   
   </div>
   <div className="diagramMain">
    <img src={img1} alt="" />
   <div className="playBox my-3 mx-auto flex justify-center items-center">
    <FaPlay />
   </div>
   </div>
   <Keyboard keyboa={handlestopKeyboard} />
   </>
  )
}

export default Home;