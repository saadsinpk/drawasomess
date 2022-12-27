import React,{useState,useEffect,useRef} from 'react';
import axios from "axios";
import config from "./services/config.json";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import {getTokenSession,getidSession} from "./utils/common";
import { toast } from "react-toastify";
import Loader from './components/common/Loader';


function AdminSetting() {
  const [userdata, setUserdata] = useState({
    primary_email: "muzzammil"
  })
  const isComponentMounted = useRef(true);
  const [formdata, setFormdata] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (isComponentMounted.current) { 
      getData();
    }
    return () => {
      isComponentMounted.current = false;
      setFormdata(null);
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
         setFormdata(response);
         setLoading(false);
       
      })
      .catch((error) => {
        setLoading(true);
        if (error.response.status === 401)
        toast.error(error.response.data.message);
        else toast.error("Something went wrong. Please try again later.");
      });
  }
    let initialValues = {
      primary_email: "",
      current_password: "",
      new_password: "",
      instagram_link: "",
      twitter_link: "",
      tiktok_link: "",
      snapchat_link: ""
    };
    // const validationSchema = yup.object({
    //     email: yup.string().email("Invaild Email").required("Must Required"),
    //     new_password: yup.string(),
    //     confirm: yup.string().oneOf([yup.ref('new_password'), null], 'Passwords must match')
    //   });
    const  handleChange  = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUserdata({...userdata,[name]: value})
    }

      const  onSubmit  = async (values) => {
        axios.defaults.headers = {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${getTokenSession()}`,
        };
        axios.put(`${config.apiEndPoint}update/1`,
           values)
          .then((response) => {
            setLoading(false);
            toast.success(response.data.message);
            setFormdata(response);
          })
          .catch((error) => {
            setLoading(false);
            if (error.response.status === 401)
            {
              toast.error(error.response.data.errorMessage);

            }
            else toast.error("Something went wrong. Please try again later.");
          });
      }
     
    

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
          initialValues={initialValues}
          onSubmit={onSubmit}
          validateOnChange
        >
           {({ isSubmitting }) => {
            return (
                <Form>
                      <div className="inputBox">
                  <Field
                      type="text"
                      name="primary_email"
                      value={userdata.primary_email}
                      onChange={handleChange}
                    
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
                      // value={!loading && formdata.data.password}
                    />
                    </div>
                  <div className="inputBox">
                  <Field
                      type="password"
                      name="new_password"
                      // value={!loading && formdata.data.password}
                    />
                    </div>
                  <div className="inputBox">
                  <Field
                      type="password"
                      name="confirm"
                      // value={""}
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
                      // value={!loading ? formdata.data.instagram_link : ""}
                    />
                    </div>
                  <div className="inputBox">
                  <Field
                      type="text"
                      name="twitter_link"
                      // value={!loading ? formdata.data.twitter_link : ""}
                    
                    />
                    </div>
                  <div className="inputBox">
                  <Field
                      type="text"
                      name="twitter_tiktok"
                      // value={!loading ? formdata.data.tiktok_link : ""} 
                    
                    />
                    </div>
                  <div className="inputBox">
                  <Field
                      type="text"
                      name="twitter_snapchat"
                      // value={!loading ? formdata.data.snapchat_link : ""}
                    
                    />
                    </div>
                  <div className='px-10'>  <button  type="submit"
                    name="submit"  disabled={isSubmitting} className='mt-4 btn btn-primary'>Save</button></div>
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