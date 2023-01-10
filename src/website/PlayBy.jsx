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
  const [apidata, setApidata] = useState("")
  const [loading, setLoading] = useState(true);
  const isComponentMounted = useRef(true);
  const navigate = useNavigate();
  useEffect(() => {
    let sshow = gameto;
    // sshow != "0" && navigate(`/`);
    if (isComponentMounted.current) {
      getData()
    }
    return () => {
      isComponentMounted.current = false;
      setLoading(true);
    };
  
  }, [])
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
  return (
    <>
    <Header settingclicks={settingclick} ele={data}  />
    <div className='my-2'>
    <Social data={apidata} />
    </div>
    <div className="diagramMain">
    <p><span id="more-1072"></span></p>
<div id="drawingDiv" >
	<canvas id="canvas1" className='mx-auto block' style={{"width":"90%", "height":"280px",  "border":"1px solid #000"}}></canvas>
<div id="colorsDiv" className='flex p-2 justify-between'>
  <div className="left">
		<span>Colors :</span>
    <div className='flex gap-2'>
<div className="colorbox selectedColor" id="blackbox" style={{"backgroundColor":"black"}} ></div>
<div className="colorbox" id="redbox" style={{"backgroundColor":"red"}}></div>
<div className="colorbox" id="bluebox" style={{"backgroundColor":"blue"}}></div>
<div className="colorbox" id="whitebox" style={{"backgroundColor":"white"}}></div>
<div className="colorbox" id="greenbox" style={{"backgroundColor":"green"}}></div>
</div>
</div>
<div className="right">
	<span>	Stoke Size :</span>
  <div className='flex items-center gap-2'>
<div className="stroke stroke_selected" style={{"borderRadius":"3px","borderWidth":"3px"}}></div>
<div className="stroke" style={{"borderRadius":"6px","borderWidth":"5px"}}></div>
<div className="stroke" style={{"borderRadius":"8px","borderWidth":"7px"}}></div>
<div className="stroke" style={{"borderRadius":"12px","borderWidth":"10px"}}></div>
<div className="stroke" style={{"borderRadius":"16px","borderWidth":"13px"}}></div>
<div className="stroke" style={{"borderRadius":"18px","borderWidth":"15px"}}></div>
</div>
</div>
</div>



   
   </div>
   </div>
   <Keyboard />
    </>  )
}

export default PlayBy