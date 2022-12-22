import React from 'react'
import { AiOutlineArrowLeft } from "react-icons/ai";
import Result from '../Result';
import Social from './Social';
import img1 from '../dist/webImages/1.png';
import Topplayers from './Topplayers';

function Statistics({popuptext}) {
  return (
   <>
   <div  className={"StatisticsMain"}>
    <div className="StatisticsMain-top p-2 flex items-center">
        <div className="StatisticsMain-top-left">
            <AiOutlineArrowLeft />
        </div>
        <h2 className="heading-right mx-auto my-0">{popuptext}</h2>
    </div>
        <Result />

        <div className='section1'>
          <Topplayers />
            <div className="section1Box bordernone">
                <h2 className='my-2 text-center'> Yesterday’s Entry</h2>
                <div className="section1Box_">
                    <img src={img1} className="w-100" alt="" />
                </div>
                <h2 className='my-2 text-center'> Dua Lipa</h2>
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

export default Statistics