import React,{useState,useEffect} from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { FaPlay } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { toast } from "react-toastify";

function UserModal({closeUserModal}) {
  const removeModal = (e) => {
    closeUserModal(false)
}
  const initialValues = {
    email : "",
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
        toast.success(response.data.message);
      })
  }
  return (
    <div  className="Modal">
    <div className="Modal__heading p-2 flex items-center">
    <div className="Modal__heading--left" onClick={removeModal}><AiOutlineArrowLeft /></div>
    </div>
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
                      type="email"
                      name="email"
                      placeholder="Email"
                      className='block inputdesign w-100 mb-4'
                    />
                      <ErrorMessage name="email">
                    {(msg) => (
                      <div style={{ color: "red", whiteSpace: "nowrap" }}>
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>

        <button className='btn btn-primary mx-auto my-2 block' disabled={isSubmitting}>Submit</button>
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