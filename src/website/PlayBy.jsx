import React, { useEffect, useRef, useState } from 'react';
import config from "../services/config.json";
import axios from 'axios';
import { toast } from "react-toastify";
import Header from '../website/components/common/Header';
import Keyboard from '../website/components/common/Keyboard';
import Social from '../website/components/common/Social';
import Loader from "../dashboard/components/common/Loader";
import { getUserToken, removeUserToken } from './utils/common';
import { useNavigate } from 'react-router-dom';

function PlayBy({settingclick,data,gameto}) {
  const [apidata, setApidata] = useState("");
  const [stopKeyboard, setStopKeyboard] = useState(false);
  const [gameData, setGameData] = useState("");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);
  const isComponentMounted = useRef(true);
  const navigate = useNavigate();
  useEffect(() => {
    let sshow = gameto;
    sshow != "1" && navigate(`/`);
    if (isComponentMounted.current) {
      getData()
    }
    return () => {
      isComponentMounted.current = false;
      setLoading(true);
    };
  
  }, [])
  const handlekeyboard = (item) => {
    setValue([...value,item].join(""));
  }
  const keyboardClickback = () => {
    let poppe = value.split("");
   poppe.pop();
    setValue(poppe.join(""))
  }
  const getData = async () => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getUserToken()}`,
    };
axios.get(`${config.apiEndPoint2}getTodaysGame`)
    .then((response) => {
      let resdata = {
        "entry_id" : response.data.todays_game.entry_id,
        "user_id" : response.data.todays_game.user_id
      }
      setGameData(response.data.todays_game)
      getData2(resdata)
   

     
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
  const getData2 =  (resdata) => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getUserToken()}`,
    };
    axios.post(`${config.apiEndPoint2}getDrawnBy`,resdata)
    .then((response) => { 
      setApidata(response.data.userData)
      setLoading(false);
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

  }
  function MyComponent() {
  
    const markup = { __html: gameData.photo_link }
    return <div className='diagramImg' dangerouslySetInnerHTML={ markup } />;
    
  }
  return (
    <>
    <Header settingclicks={settingclick} ele={data}  />
    <div className='my-2'>
    <Social data={apidata} />
    </div>
    <div className="diagramMain">
    <p><span id="more-1072"></span></p>
<div id="drawingDiv" >
	<div className='gragImg'>
    {MyComponent()}
  </div>
  <div className='flex items-center justify-between w-100 px-4 py-3'>
    <div className="colorMain flex items-center gap-2">
    <div className="colorMainB">
            <h5>color</h5>
        <div className="colorMainBox flex  justify-center gap-1">
            <div className="colorMainBox_" style={{background:"#377E22"}}> </div>
            <div className="colorMainBox_" style={{background:"#EA3323"}}> </div>
            <div className="colorMainBox_" style={{background:"#0000F5"}}> </div>
            <div className="colorMainBox_" style={{background:"#FFFFFF"}}> </div>
            <div className="colorMainBox_" style={{background:"#000000"}}> </div>
        </div>
        </div>
        </div>
        <div className='size text-center'>
            <p className='m-0'>SIZE</p>
            <div className="sizeB flex items-center gap-2">
            <div className="sizeBox active"></div>
            <div className="sizeBox"></div>
            <div className="sizeBox"></div>
            <div className="sizeBox"></div>
            <div className="sizeBox"></div>
            </div>
        </div>
  
   </div>



   
   </div>
   </div>
   <Keyboard keyval={value} dataitem={(item) =>handlekeyboard(item)} keyremove={keyboardClickback} keyboa={handlestopKeyboard} submitenter={handlesubmit} />
    </>  )
}

export default PlayBy