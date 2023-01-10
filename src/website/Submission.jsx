import React, { useEffect, useState } from 'react';
import axios from "axios";
import config from "../services/config.json";
import { useNavigate } from "react-router-dom";
import Header2 from '../website/components/common/Header2';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import img1 from '../dist/webImages/1.png';
import { FaPlay } from "react-icons/fa";
import ThanksMessage from '../website/components/common/ThanksMessage';
import { toast } from "react-toastify";
import { getUserToken } from './utils/common';


function Submission({data,settingclick,gameto}) {
  const [loading, setLoading] = useState(true);
  const [submitbutton, setSubmitbutton] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    let sshow = gameto;
    console.log(sshow)
    sshow != "0" && navigate(`/`);
    
  
  }, [])
  
  const [thanks, setThanks] = useState(false);

  const initialValues = {
    word_phrase : "hfgjhg",
    email : "",
    username : "",
    instagram_link : "",
    snapchat_link : "",
    tiktok_link : "",
    twitter_link : "",
    share_my_user : "",
    share_social_media_accounts : "",
    photo_link: "drgfrg" 
  };
  const validationSchema = yup.object({
    email: yup.string().email("Invaild Email").required("Must Required"),
  });
  const  onSubmit  =  (values) => {
    setSubmitbutton(true)
    axios.defaults.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getUserToken()}`,
    };
    axios.post(`${config.apiEndPoint2}submitEntry`,
       values)
      .then((response) => {
        setSubmitbutton(false)
        if(response.data.errorMessage) {
          toast.error(response.data.errorMessage);
        }
        else {
          setThanks(true)
          toast.error(response.data.Message);
        }
        
          })
          .catch((error) => {
            if (error?.response?.status === 500) {
    
            } else if (error?.response?.status === 401) {
              setLoading(true);
              toast.error(error.response.data.message);
            } else {
              setLoading(true);
              toast.error("Something went wrong. Please try again later.");
            }
          });
  }
  const handlefalse = () => {
    setThanks(false)
  }
  return (
   <>
   <Header2 settingclicks={settingclick} ele={data}  />
   <div className="diagramMain p-4">
    <div className='canvasDiv'>
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
   </div>
  {thanks && <ThanksMessage handles={handlefalse} />}

  {!thanks && <div className="formMain">
   <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnChange
        >
           {({ isSubmitting }) => {
            return (
                <Form>
                  <div className="inputBox">
                  <Field
                      type="text"
                      name="phrase"
                      placeholder="Your word or Phrase"
                    />
                  </div>
                  <div className="inputBox">
                  <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                    />
                      <ErrorMessage name="email">
                    {(msg) => (
                      <div style={{ color: "red", whiteSpace: "nowrap" }}>
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                  </div>
                  <div className="inputBox">
                  <Field
                      type="text"
                      name="instagram_link"
                      placeholder="Instagram Username (Optional)"
                    />
                  </div>
                  <div className="inputBox">
                  <Field
                      type="text"
                      name="tiktok_link"
                      placeholder="TikTok Username (Optional)"
                    />
                  </div>
                  <div className="inputBox">
                  <Field
                      type="text"
                      name="twitter_link"
                      placeholder="Twitter Handle (Optional)"
                    />
                  </div>
                  <div className="inputBox">
                  <Field
                      type="text"
                      name="snapchat_link"
                      placeholder="Snapchat Username (Optional)"
                    />
                  </div>
                  <div className='checkboxsection'>
                    <p className='text-center'>If selected...</p>
                    <div className='radioBox flex'>
                    <div className="radioBox_ flex gap-1  w-100">
                    <Field
                      type="radio"
                      name="share_my_user"
                      id="share"
                      value={"true"}
                      />
                      <label htmlFor="share">Share my username</label>
                    </div>
                    <div className="radioBox_ flex gap-1  w-100">
                    <Field
                      type="radio"
                      name="share_my_user"
                      id="anonymous"
                      value={"false"}
                      />
                      <label htmlFor="anonymous">Stay anonymous</label>
                    </div>
                    </div>
                    <div className="radioBox_ flex gap-1 mt-2  w-100">
                    <Field
                      type="checkbox"
                      name="share_social_media_accounts"
                      id="shareaccounts"
                      />
                      <label htmlFor="shareaccounts">If selected, share social media accounts</label>
                    </div>
                  </div>
                  <button    disabled={submitbutton} className='btn btn-primary my-2 block mx-auto'>{submitbutton ? "Submit..." : "Submit"}</button>
              </Form>
           );
          }}
        </Formik>
   </div>} 
   </>
  )
}

export default Submission