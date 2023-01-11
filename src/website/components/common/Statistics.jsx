import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineArrowLeft } from "react-icons/ai";
import config from "../../../services/config.json";
import Result from '../Result';
import Social from './Social';
import img1 from '../../../dist/webImages/1.png';
import Topplayers from './Topplayers';
import { getUserToken, removeUserToken } from '../../utils/common';
import axios from 'axios';
import { toast } from "react-toastify";

function Statistics({popuptext,closeStatistics}) {
    const [datan, setDatan] = useState("")
    const [loading, setLoading] = useState(true);
    const isComponentMounted = useRef(true);
    useEffect(() => {
      if (isComponentMounted.current) {
        getData()
      }
      return () => {
        isComponentMounted.current = false;
        setLoading(true);
      };
    }, [datan]);
    const getData = async () => {
        axios.defaults.headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getUserToken()}`,
        };
    axios.get(`${config.apiEndPoint2}statistics`)
        .then((response) => {
            setDatan(response.data)
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
    //   if (loading) return <Loader />;
    const removeModal = () => {
        closeStatistics(false)
    }
  return (
   <>
   <div  className={"Modal"} onClick={removeModal}>
    <div className="ModalBox" onClick={(e) => e.stopPropagation()}>
    <div className="StatisticsMain-top p-2 flex items-center">
        <div className="StatisticsMain-top-left" onClick={removeModal}>
            <AiOutlineArrowLeft />
        </div>
        <h2 className="heading-right mx-auto my-0">{popuptext}</h2>
    </div>
        <Result datas={datan} />

        <div className='section1'>
          <Topplayers  />
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
                <Social data={"dgfkj"} />
            </div>
            </div>
        </div>
        </div>
   </div>
   </>
  )
}

export default Statistics