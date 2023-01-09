import React, { useEffect, useRef, useState } from 'react'
import axios from "axios";
import config from "../services/config.json";
import Result from '../website/components/Result';
import Social from '../website/components/common/Social';
import img1 from '../dist/webImages/1.png';
import Loader from "../dashboard/components/common/Loader";
import { toast } from "react-toastify";
import Header from './components/common/Header';
import { removeUserToken } from './utils/common';

function Faq({data,settingclick,se}) {
    const [loading, setLoading] = useState(true);
    const isComponentMounted = useRef(true);
    useEffect(() => {
        if (isComponentMounted.current) {
          getDataa();  
        }
        return () => {
          isComponentMounted.current = false;
          setLoading(true);
        };
      }, []);
    const getDataa = async () => {
    axios.get(`${config.apiEndPoint2}getUserId`)
        .then((response) => {
          setLoading(false);
          se(false)
        })
        .catch((error) => {
          removeUserToken("usertoken");
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
    <div  className="Faq" ele={data}>
    <div className="Modal__heading p-2 flex items-center">
    {/* <div className="Modal__heading--left" onClick={removeModal}><AiOutlineArrowLeft /></div> */}
    <h1 className="Modal__heading-right mx-auto my-0">Faq</h1>
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