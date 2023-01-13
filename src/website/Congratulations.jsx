import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
  import config from "../services/config.json";
import {Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Result from './components/Result';
import Social from './components/common/Social';
import Topplayers from './components/common/Topplayers';
import Loader from "../dashboard/components/common/Loader";
import Time from './components/common/Time';
import Header from './components/common/Header';
import { getUserToken, removeUserToken } from './utils/common';
import axios from 'axios';
import { toast } from "react-toastify";

function Congratulations({settingclick,data,gameto}) {
  const navigate = useNavigate();
  useEffect(() => {
    let sshow = gameto;
    sshow != "1" && navigate(`/`);
  }, [gameto])
  const [datann, setDatann] = useState("")
  const [loading, setLoading] = useState(true);
  const isComponentMounted = useRef(true);

  useEffect(() => {
    if (isComponentMounted.current) {
      getDatass()
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
      if(response.data.errorMessage) {
      }
      else {
        let entry = response.data.todays_game.entry_id
        getData(entry)
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
  const getData = async () => {
      axios.defaults.headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getUserToken()}`,
      };
  axios.post(`${config.apiEndPoint2}statistics`, {
    "entry_id": "9"
  })
      .then((response) => {
        setDatann(response.data)
          console.log(response.data)
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
  return (
    <>
    <Header settingclicks={settingclick} ele={data} />
   <div  className="con">
    <div className="StatisticsMain-top p-2 flex items-center">
        <Link className="StatisticsMain-top-left" to={"/"}>
            <AiOutlineArrowLeft />
        </Link>
        <h2 className="heading-right mx-auto my-0">Congratulations</h2>
    </div>
    <Time datas={datann} />
    
        <Result datas={datann} />

        <div className='section1'>
          <Topplayers data={"user"} />
          <div className="section1Box bordernone">
            <h2>Got what it takes to enter a challenging drawing? Click 
              <Link to={"/submission"} > here </Link> to take your shot at submitting a drawing to be used for upcoming challenges.</h2>
          </div>
            <div className="section1Box section1Box3 my-2">
            <div className='flowBox text-center'>
                <h2 className='mb-2'>Follow us below</h2>
                <Social data={"dashgki"} />
            </div>
            </div>
        </div>
       
   </div>
   </>
  )
}

export default Congratulations