import React from 'react'
import { AiOutlineArrowLeft } from "react-icons/ai";
import Result from '../Result';
import Social from './Social';
import img1 from '../../../dist/webImages/1.png';
import Topplayers from './Topplayers';

function Faq({popuptext}) {
    const removeModal = (e) => {
        const setting = document.querySelector(".Setting");
        setting.classList.remove("active");
    }
  return (
   <>
    <div  className="Modal">
    <div className="Modal__heading p-2 flex items-center">
    <div className="Modal__heading--left" onClick={removeModal}><AiOutlineArrowLeft /></div>
    <h2 className="Modal__heading-right mx-auto my-0">{popuptext}</h2>
    </div>
    <div className="Modal__body p-3">
            <div className='text-center faqBox border-t py-2'>
                <h3 className=''>Why can’t I see the drawer’s social media?.</h3>
                <p>The pop up will be available after the 60 second drawing. Some submitters may also choose to make their social media private</p>
            </div>
            <div className='text-center faqBox border-t py-2'>
                <h3 className=''>Why is my video not playing?</h3>
                <p>Each device will only allow for 1 play per day. Once you’ve started the video you cannot pause or stop. You’ll have to try again for the next day.</p>
            </div>
            <div className='text-center faqBox border-t py-2'>
                <h3 className=''>Why can’t I see the user’s name?</h3>
                <p>Submitters have the option to be anonymous therefore on some days you might not sell the drawer information.</p>
            </div>
            <div className='text-center faqBox border-t py-2'>
                <h3 className=''>Am I allowed to play and submit on the same day?</h3>
                <p>Yes</p>
            </div>
            <div className='text-center faqBox mt-4 border-t py-3'>
                <h2 className=''>SUBMITTER FAQ</h2>
                <p>Yes</p>
            </div>
             <div className='text-center faqBox border-t py-2'>
                <h3 className=''>Why can’t I see the user’s name?</h3>
                <p>Submitters have the option to be anonymous therefore on some days you might not sell the drawer information.</p>
            </div>

    </div>
        </div>
        </>
  )
}

export default Faq