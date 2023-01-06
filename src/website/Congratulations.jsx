import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Result from './components/Result';
import Social from './components/common/Social';
import Topplayers from './components/common/Topplayers';
import Loader from "../dashboard/components/common/Loader";
import Time from './components/common/Time';
import Header from './components/common/Header';

function Congratulations({settingclick,data,gameto}) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    let sshow = gameto;
    !sshow && navigate(`/`);
    setLoading(false)
  
  }, [])
  
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
    <Time />
    
        <Result />

        <div className='section1'>
          <Topplayers />
          <div className="section1Box bordernone">
            <h2>Got what it takes to enter a challenging drawing? Click 
              <Link to={"/submission"} > here </Link> to take your shot at submitting a drawing to be used for upcoming challenges.</h2>
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

export default Congratulations