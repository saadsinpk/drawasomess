import React from 'react'
import { AiOutlineArrowLeft } from "react-icons/ai";
import Result from '../Result';
import Social from './Social';
import Topplayers from './Topplayers';
import Time from './Time';

function Congratulations({statistics,popuptext}) {

  return (
   <>
   <div  className={statistics == "active" ? 'StatisticsMain congratulationsm active': "congratulationsm StatisticsMain"}>
    <div className="StatisticsMain-top p-2 flex items-center">
        <div className="StatisticsMain-top-left">
            <AiOutlineArrowLeft />
        </div>
        <h2 className="heading-right mx-auto my-0">{popuptext}</h2>
    </div>
    <Time />
    
        <Result />

        <div className='section1'>
          <Topplayers />
          <div className="section1Box bordernone">
            <h2>Got what it takes to enter a challenging drawing? Click <a href="#">here</a> to take your shot at submitting a drawing to be used for upcoming challenges.</h2>
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