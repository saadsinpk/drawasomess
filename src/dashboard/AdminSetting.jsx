import React,{useState,useEffect,useRef} from 'react';
import axios from "axios";
import config from "../services/config.json";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import {getTokenSession,getidSession} from "./utils/common";
import { toast } from "react-toastify";
import Loader from './components/common/Loader';


function AdminSetting() {
  const [userdata, setUserdata] = useState({
    primary_email: "",
    current_password: "",
    new_password: "",
    confirm: "",
    instagram_link: "",
    twitter_link: "",
    tiktok_link: "",
    snapchat_link: ""
  });
  const [submitbutton, setSubmitbutton] = useState(false)
  const isComponentMounted = useRef(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (isComponentMounted.current) { 
      getData();
    }
    return () => {
      isComponentMounted.current = false;
      setLoading(true);
    }
  }, []);
  const getData = async () => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      "Authorization":`Bearer ${getTokenSession()}`,
    };
    axios.get(`${config.apiEndPoint}profile/1`,)
       .then ((response) => {
         setLoading(false);
         setUserdata({
          primary_email: response.data.data.email,
          current_password: response.data.data.password,
          instagram_link: response.data.data.instagram_link,
          twitter_link: response.data.data.twitter_link,
          tiktok_link: response.data.data.tiktok_link,
          snapchat_link: response.data.data.snapchat_link == null && "",
          new_password: "",
          confirm: ""
        })
       
      })
      .catch((error) => {
        setLoading(true);
        if (error.response.status === 401)
        toast.error(error.response.data.message);
        else toast.error("Something went wrong. Please try again later.");
      });
  }
    const validationSchema = yup.object({
      primary_email: yup.string().email("Invaild Email").required("Must Required"),
        new_password: yup.string(),
        confirm: yup.string().oneOf([yup.ref('new_password'), null], 'Passwords must match')
      });


      const  onSubmit  = async (values) => {
        setSubmitbutton(true)
        axios.defaults.headers = {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${getTokenSession()}`,
        };
        axios.put(`${config.apiEndPoint}update/1`,
           values)
          .then((response) => {
            setSubmitbutton(false)
            setLoading(false);
            toast.success(response.data.message);
          })
          .catch((error) => {
            setSubmitbutton(false)
            setLoading(false);
            if (error.response.status === 401)
            {
              toast.error(error.response.data.errorMessage);

            }
            else toast.error("Something went wrong. Please try again later.");
          });
      }
      if (loading) return <Loader />;
  return (
    <div className='my-5 p-5'>
   <div className='adminForm flex'>
    <div className="adminFormleft p-4">
    <div className="adminFormleftBox">Primary E-Mail</div>
    <div className="adminFormleftBox">Current Password</div>
    <div className="adminFormleftBox">New Password</div>
    <div className="adminFormleftBox">Confirm</div>
    <div className="adminFormleftBox">Instagram Link</div>
    <div className="adminFormleftBox"> Twitter Link</div>
    <div className="adminFormleftBox">TikTok Link</div>
    <div className="adminFormleftBox">Snapchat Link</div>
    </div>
    <div className="adminFormright">
    <Formik
          initialValues={userdata}
          onSubmit={onSubmit}
          validateOnChange
          validationSchema={validationSchema}
        >
           {({ isSubmitting }) => {
            return (
                <Form>
                      <div className="inputBox">
                  <Field
                      type="text"
                      name="primary_email"
                    
                    />
                      <ErrorMessage name="primary_email">
                    {(msg) => (
                      <div style={{ color: "red", whiteSpace: "nowrap" }}>
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                  </div>
                  <div className="inputBox">
                  <Field
                      type="password"
                      name="current_password"
                    />
                    </div>
                  <div className="inputBox">
                  <Field
                      type="password"
                      name="new_password"
                    />
                    </div>
                  <div className="inputBox">
                  <Field
                      type="password"
                      name="confirm"
                    />
                       <ErrorMessage name="confirm">
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
                    />
                    </div>
                  <div className="inputBox">
                  <Field
                      type="text"
                      name="twitter_link"
                    
                    />
                    </div>
                  <div className="inputBox">
                  <Field
                      type="text"
                      name="tiktok_link"
                    
                    />
                    </div>
                  <div className="inputBox">
                  <Field
                      type="text"
                      name="snapchat_link"
                    
                    />
                    </div>
                  <div className='px-10'>  <button  type="submit"
                    name="submit"  disabled={submitbutton} className='mt-4 btn btn-primary'> {submitbutton ? "login..." : "login"}</button></div>
                    </Form>
           );
          }}
        </Formik>
    </div>
   </div>
   </div>
  )
}

export default AdminSetting