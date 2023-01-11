import React, { useEffect, useRef, useState } from 'react';
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
import { ReactSketchCanvas } from "react-sketch-canvas";


function Submission({data,settingclick,gameto}) {
  const [loading, setLoading] = useState(true);
  const [submitbutton, setSubmitbutton] = useState(false);
  const [useCanvas, setUseCanvas] = useState(false);
  const [time, setTime] = useState(60);
  const [startTimer, setStartTimer] = useState(false);
  const [timerid, setTimerid] = useState(0);
  const [thanks, setThanks] = useState(false);
  const [showtext, setShowtext] = useState(false)
  const [canvasdata, setCanvasdata] = useState({
    some: "",
    color: "#000",
    size: "3",
  })
  const refcanvas = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    let sshow = gameto;
    sshow != "1" && navigate(`/`);
    
  
  }, [])
  const  handleplay = () => {
    if(gameto == "0") {
      setStartTimer(true)
      setUseCanvas(true)
      setInitialValues({...initialValues,photo_link:""});
    }
  }

  useEffect(() => {
    let interval = null;
    setTime(10)
    if (startTimer) {
      interval = setInterval(() => {
        setTime((prev) => {
          if (prev == 0) {
            handlestop();
            handleexport()
           
            return prev;
          } else {
            return prev - 1;
          }
        });
      }, 1000);
      setTimerid(interval);
    } else {
      clearInterval(timerid);
    }
  }, [startTimer]);

const [initialValues, setInitialValues] = useState({
  word_phrase : "",
  email : "",
  instagram_link : "",
  snapchat_link : "",
  tiktok_link : "",
  twitter_link : "",
  share_my_user : "",
  share_social_media_accounts : "",
  photo_link: "" 
})
  const validationSchema = yup.object({
    email: yup.string().email("Invaild Email").required("Must Required"),
    word_phrase: yup.string().max(10000).required("Must Required"),
  });
  const  handleexport = () => {
    refcanvas.current.exportImage("png")
    .then((data) => {
      setCanvasdata({...canvasdata,"some":data});
      data ? setInitialValues({...initialValues,photo_link:data}) :
      setInitialValues({...initialValues,photo_link:data});
      console.log(initialValues,data)
    })
    .catch((e) => {
      console.log(e);
    });
  }

  const  onSubmit  =  (values) => {
    values.photo_link = initialValues.photo_link
    values.share_my_user = initialValues.share_my_user == true ? true : false 
    if(values.photo_link) {
      setShowtext(false)
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
            setSubmitbutton(false)
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
        else {
          setShowtext(true)
        }
  }
  const handlefalse = () => {
    setThanks(false)
  }
  const handlecolor = (e) => {
    let color = e.target.style.background;
    setCanvasdata({...canvasdata,color})
  }
  const handlesize = (e) => {
    document.querySelector(".sizeBox.active").classList.remove("active");
    if(e.target) {
      e.target.classList.add("active");
    }
    let size = e.target.getAttribute("data-size");
    setCanvasdata({...canvasdata,size})
  }
  function handlestop() {
    setStartTimer(false);
    setUseCanvas(false);
   
  }
  return (
   <>
   <Header2 settingclicks={settingclick} ele={data}  />
   <div className="diagramMain p-4">
   <div className='canvasc'>
    {useCanvas ?  <ReactSketchCanvas
            style={{
              border: "0.0625rem solid #fff"
            }}
            ref={refcanvas}
            strokeWidth={canvasdata.size}
            strokeColor={canvasdata.color}
            canvasColor="#fff"
          /> : canvasdata.some ? <div><img src={canvasdata.some} /></div> :<div></div>}
          
          </div>
    {showtext && <div style={{color:"red"}}>fill canvas</div> }
    
    <div className='flex items-center justify-between w-100'>
    <div className="colorMain flex items-center gap-2">
    <button onClick={handleplay} style={{fontSize:"30px",width:"30px"}}>{startTimer ? time : <FaPlay /> }</button>
    <div className="colorMainB">
            <h5>color</h5>
        <div className="colorMainBox flex  justify-center gap-1">
            <button onClick={(e) => handlecolor(e)} className="colorMainBox_" style={{background:"#377E22"}}> </button>
            <button onClick={(e) => handlecolor(e)} className="colorMainBox_" style={{background:"#EA3323"}}> </button>
            <button onClick={(e) => handlecolor(e)} className="colorMainBox_" style={{background:"#0000F5"}}> </button>
            <button onClick={(e) => handlecolor(e)} className="colorMainBox_" style={{background:"#FFFFFF"}}> </button>
            <button onClick={(e) => handlecolor(e)} className="colorMainBox_" style={{background:"#000000"}}> </button>
        </div>
        </div>
        </div>
        <div className='size text-center'>
            <p className='m-0'>SIZE</p>
            <div className="sizeB flex items-center gap-2">
            <button onClick={(e) => handlesize(e)} data-size="10"  className="sizeBox"></button>
            <button onClick={(e) => handlesize(e)} data-size="7" className="sizeBox"></button>
            <button onClick={(e) => handlesize(e)} data-size="5" className="sizeBox"></button>
            <button onClick={(e) => handlesize(e)} data-size="3" className="sizeBox active"></button>
            <button onClick={(e) => handlesize(e)} data-size="1" className="sizeBox"></button>
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
                      name="word_phrase"
                      placeholder="Your word or Phrase"
                    />
                    
                    <ErrorMessage name="word_phrase">
                    {(msg) => (
                      <div style={{ color: "red", whiteSpace: "nowrap" }}>
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
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