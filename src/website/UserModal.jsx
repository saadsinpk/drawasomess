import React,{useState,useEffect} from 'react'
import axios from "axios";
import config from "../services/config.json";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { FaPlay } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { toast } from "react-toastify";
import Header from './components/common/Header';
import { getUserToken, removeUserToken,setUserToken } from './utils/common';

function UserModal({data,settingclick,gameto,updatess}) {
  const [loading, setLoading] = useState(true);
  const [submitbutton, setSubmitbutton] = useState(false)
  const initialValues = {
    username : "",
  };
  const validationSchema = yup.object({
    username: yup.string().required("Must Required"),
  });
  const  onSubmit  = async (values) => {
    setSubmitbutton(true)
    axios.defaults.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getUserToken()}`,
    };
    axios.put(`${config.apiEndPoint2}updateUsername`,
    values)
    .then((response) => {
      setSubmitbutton(false)
      setUserToken(response.data.newToken)
      toast.success(response.data.message);
      updatess()
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

  return (
    <div  className="">
        <Header settingclicks={settingclick} ele={data}  />
    <div className="Modal__heading p-4 flex items-center">
    <Link to={"/congratulations"} className="Modal__heading--left"><AiOutlineArrowLeft /></Link>
    </div>
    <br />
    <br />
    <br />
    <br />
    <div className="Modal__body p-3">
    <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnChange
        >
           {({ isSubmitting }) => {
            return (
                <Form>
        <Field
                      type="test"
                      name="username"
                      placeholder="username"
                      className='block inputdesign w-100 mb-4'
                    />
                      <ErrorMessage name="username">
                    {(msg) => (
                      <div style={{ color: "red", whiteSpace: "nowrap" }}>
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>

        <button className='btn btn-primary mx-auto my-2 block'  disabled={submitbutton}> {submitbutton ? "Submit..." : "Submit"}</button>
        </Form>
           );
          }}
        </Formik>

        <p>Please enter your game username to see if you ranked top 30 today.</p>
        <p>if you do not wish to enter a username , please click <a href="#">here</a> to see result without your ranking</p>
    </div>
    </div>
  )
}

export default UserModal