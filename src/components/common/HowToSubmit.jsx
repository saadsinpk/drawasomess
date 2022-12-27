
import React from 'react';
import img1 from '../dist/webImages/2.png'
import { FaPlay } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

function HowToSubmit({closesubmirModal}) {
    const removeModal = (e) => {
        closesubmirModal(false)
    }
  return (  

   <>
   <div  className={'Modal'}>
   <div className="closebutton ml-auto text-right px-2">
       <button onClick={removeModal}><AiOutlineClose /></button>
   </div>
   <h2><b>How to Submit</b></h2>
   <p>Press play and you will have 60 seconds to draw an image. Enter the word or phrase as well as your information and submit. There is no limited to length of word(s).</p>
   <div className="section10_img my-3">
    <img src={img1} alt="" />
   </div>
   <div className='flex items-center justify-between w-100'>
    <div className="colorMain flex items-center gap-2">
    <div className='playbtn'><FaPlay /></div>
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
   <div className="forst my-2 mx-auto text-center py-2"></div>
   <div className="section10_t mt-4">
    <p>Our team will review your image and you will be notified via email if selected for upcoming an date. Your social media handle will be shared if you choose however your email will be kept private at all times.</p>
   </div>
  </div></>
  )
}

export default HowToSubmit