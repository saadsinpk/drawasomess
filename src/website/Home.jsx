import React,{useCallback, useEffect, useRef, useState} from 'react';
import $ from "jquery";
import { Link,  useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../services/config.json";
import Header from './components/common/Header';
import Keyboard from './components/common/Keyboard';
import img1 from '../dist/webImages/1.png';
import { FaPlay,FaPause } from "react-icons/fa";
import Loader from '../dashboard/components/common/Loader';
import { toast } from "react-toastify";
import { getUserToken, removeUserToken } from './utils/common';

function Home({data,settingclick,gameto,ga}) {
  const navigate = useNavigate();
  const [stopKeyboard, setStopKeyboard] = useState(false);
  const [time, setTime] = useState(60);
  const [startTimer, setStartTimer] = useState(false);
  const [timerid, setTimerid] = useState(0);
  const  handleplay = () => {
    if(gameto == "0") {
      setStartTimer(true)
    }
  }
  function handlestop() {
    setStartTimer(false);
  }
  useEffect(() => {
    let interval = null;
    if (startTimer) {
      interval = setInterval(() => {
        setTime((prev) => {
          if (prev == 0) {
            handlestop();
            handlesubmit()
            return prev;
          } else {
            return prev - 1;
          }
        });
      }, 1000);
      setTimerid(interval);
    } else {
      clearInterval(timerid);
    }
  }, [startTimer]);
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
  const [getGameImages, setGetGameImages] = useState("")
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
        setGetGameImages(response.data.todays_game.photo_link)
      
       
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
  const handlesubmit = () => {
    if(startTimer) {
      console.log( $(".typeval").val())
      handlestop();
      setStartTimer(false)
      navigate(`/congratulations`)
    }
  }
  return (
   <>
   <Header keyboa={handlestopKeyboard}  settingclicks={settingclick} ele={data}  />
   <div className="jeff text-center flex justify-end p-4 ml-auto">
    {gameto == "1" ?  <Link to={"/playby"}>Today's submission by JEFF </Link> : 
    <p>Today's submission by JEFF
      </p>}
   
   </div>
   <div className="diagramMain">
    {getGameImages}
   <div className="playBox my-3 mx-auto flex justify-center items-center">
   <button onClick={handleplay}>{startTimer ? time : <FaPlay /> }</button>
    
   </div>
   </div>
   <Keyboard keyboa={handlestopKeyboard} submitenter={handlesubmit} />
   </>
  )
}

export default Home;