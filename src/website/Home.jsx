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

function Home({data,settingclick,gameto,ga,upsetTodayGameShoe}) {
  const navigate = useNavigate();
  const [gameUserName, setGameUserName] = useState("")
  const [stopKeyboard, setStopKeyboard] = useState(false);
  const [time, setTime] = useState(60);
  const [startTimer, setStartTimer] = useState(false);
  const [timerid, setTimerid] = useState(0);
  const [value, setValue] = useState("");
  const [gameserdata, setGameserdata] = useState("")
  const [todayGame, setTodayGame] = useState("");
  const handlekeyboard = (item) => {
    setValue([...value,item].join(""));
  }
  const keyboardClickback = () => {
    let poppe = value.split("");
   poppe.pop();
    setValue(poppe.join(""))
  }
  const  handleplay = () => {
    if(gameto == "0") {
      setStartTimer(true)
    }
  }
  function handlestop() {
    setStartTimer(false);
  }
  useEffect(() => {
    setTime(60)
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
       
        if(response.data.errorMessage) {
          console.log("h")
            setTodayGame(response.data.errorMessage)
          setLoading(false)
        }
        else {
          ga({
            "user_id": response.data.todays_game.user_id,
            "entry_id": response.data.todays_game.entry_id
          })
          setGameserdata(response.data.todays_game)
          setGetGameImages(response.data.todays_game.photo_link)  
          setGameUserName(response.data.todays_game.username)
          setLoading(false)

        }
      
       
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
      handlestop();
      setStartTimer(false)
      submitgame()
     
    }
  }
  const submitgame =  () => {

    let ti = time;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getUserToken()}`,
    };
axios.post(`${config.apiEndPoint2}checkGameWord`,{
  "keyword":value,
  "entry_id": gameserdata.entry_id,
  "game_complete_time": eval(((60 - ti) + Math.random()).toFixed(2))
  
})
    .then((response) => {
      upsetTodayGameShoe("1")
      if(response.data.errorMessage) {
        toast.error(response.data.errorMessage);

      }
      else {
        gameto = 1;
        toast.success(response.data.message);
         navigate(`/congratulations`);
      }
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

function MyComponent() {
  
  const markup = { __html: getGameImages }
  return <div className='diagramImg' dangerouslySetInnerHTML={ markup } />;
  
}
  return (
   <>
   <Header keyboa={handlestopKeyboard}  settingclicks={settingclick} ele={data}  />
   <div className="jeff text-center flex justify-end p-4 ml-auto">
    {gameto == "1" ?  <Link to={"/playby"}>Today's submission by JEFF </Link> : 
    <p>Today's submission by {gameUserName && gameUserName }
      </p>}
   
   </div>
   <div className="diagramMain">
   {startTimer ? MyComponent() : <div className='diagramImg ' style={{minHeight:"180px"}}></div>}
   {!todayGame ? (gameto == "0" ?
   <div className="playBox my-3 mx-auto flex justify-center items-center">
     <button onClick={handleplay}>{startTimer ? time : <FaPlay /> }</button> 
   </div> :
    <div className='text-center my-3 px-3' style={{color:"red"}}>You have played the game now try again tomorrow</div>) : <div className='text-center my-3 px-3' style={{color:"red"}}>No Game Today</div>}
   </div>
   <Keyboard keyval={value} dataitem={(item) =>handlekeyboard(item)} keyremove={keyboardClickback} keyboa={handlestopKeyboard} submitenter={handlesubmit} />
   </>
  )
}

export default Home;