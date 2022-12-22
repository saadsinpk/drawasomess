import React from 'react'
import Header from './components/common/Header';
import { AiOutlineArrowLeft } from "react-icons/ai";
import Result from './components/Result';
import Social from './components/common/Social';
import img1 from './components/dist/webImages/1.png';
import Setting from './components/common/Setting';

function Statistics() {
  return (
   <>
   <Header />
   <Setting />
   <div className='StatisticsMain'>
    <div className="StatisticsMain-top p-2 flex items-center">
        <div className="StatisticsMain-top-left">
            <AiOutlineArrowLeft />
        </div>
        <div className="StatisticsMain-top-center mx-auto my-0">
        Statistics
        </div>
    </div>
        <Result />

        <div className='section1'>
            <div className="section1Box">
            <h2>See today’s top 30 players so far by clicking <a href="#">here</a></h2>
            </div>
            <div className="section1Box bordernone">
                <h2 className='my-2 text-center'> Yesterday’s Entry</h2>
                <div className="section1Box_">
                    <img src={img1} class="w-100" alt="" />
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