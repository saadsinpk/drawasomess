import React,{useState,useEffect} from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header2 from '../website/components/common/Header2';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import img1 from '../dist/webImages/1.png';
import { FaPlay } from "react-icons/fa";
import ThanksMessage from '../website/components/common/ThanksMessage';


function Submission() {
  const [thanks, setThanks] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    phrase : "",
    email : "",
    username : "",
    instagramusername : "",
    tiktokusername : "",
    twitterhandle : "",
    facebookusername : "",
    youtube : "",
    share : "",
    anonymous : "",
    shareaccounts : ""
  };
  const validationSchema = yup.object({
    email: yup.string().email("Invaild Email").required("Must Required"),
  });
  const  onSubmit  = async (values) => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
    };
    axios.post(`https://fastbuddys.com/corePHP/api-login.php`,
       values)
      .then((response) => {
        setThanks(true)
      })
  }
  return (
   <>
   <Header2  />
   <div className="diagramMain p-4">
    <img src={img1} alt="" />
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
  {thanks && <ThanksMessage />}

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
                      name="username"
                      placeholder="Username"
                    />
                  </div>
                  <div className="inputBox">
                  <Field
                      type="text"
                      name="instagramusername"
                      placeholder="Instagram Username (Optional)"
                    />
                  </div>
                  <div className="inputBox">
                  <Field
                      type="text"
                      name="tiktokusername"
                      placeholder="TikTok Username (Optional)"
                    />
                  </div>
                  <div className="inputBox">
                  <Field
                      type="text"
                      name="twitterhandle"
                      placeholder="Twitter Handle (Optional)"
                    />
                  </div>
                  <div className="inputBox">
                  <Field
                      type="text"
                      name="facebookusername"
                      placeholder="Facebook Username (Optional)"
                    />
                  </div>
                  <div className="inputBox">
                  <Field
                      type="text"
                      name="youtube"
                      placeholder="Youtube (Optional)"
                    />
                  </div>
                  <div className='checkboxsection'>
                    <p className='text-center'>If selected...</p>
                    <div className='radioBox flex'>
                    <div className="radioBox_ flex gap-1  w-100">
                    <Field
                      type="checkbox"
                      name="share"
                      id="share"
                      />
                      <label htmlFor="share">Share my username</label>
                    </div>
                    <div className="radioBox_ flex gap-1  w-100">
                    <Field
                      type="checkbox"
                      name="anonymous"
                      id="anonymous"
                      />
                      <label htmlFor="anonymous">Stay anonymous</label>
                    </div>
                    </div>
                    <div className="radioBox_ flex gap-1 mt-2  w-100">
                    <Field
                      type="checkbox"
                      name="shareaccounts"
                      id="shareaccounts"
                      />
                      <label htmlFor="shareaccounts">If selected, share social media accounts</label>
                    </div>
                  </div>
                  <button   disabled={isSubmitting} className='btn btn-primary my-2 block mx-auto'>SUBMIT</button>
              </Form>
           );
          }}
        </Formik>
   </div>} 
   </>
  )
}

export default Submission