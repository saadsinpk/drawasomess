import React,{useState} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

function AdminSetting() {
    const navigate = useNavigate();
    const initialValues = {
      email: "",
      currentPassword: "",
      newPassword: "",
      confirm: "",
      intragram: "",
      twitter : "",
      tiktok : "",
      snapchat: ""
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
          })
      }
  return (
   <div className='adminForm'>
    <div className="adminFormleft">
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
          validationSchema={validationSchema}
          validateOnChange
        >
           {({ isSubmitting }) => {
            return (
                <Form>
                      <div className="inputBox">
                  <Field
                      type="text"
                      name="youtube"
                      placeholder="Youtube (Optional)"
                    />
                      <ErrorMessage name="email">
                    {(msg) => (
                      <div style={{ color: "red", whiteSpace: "nowrap" }}>
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                  </div>
                    </Form>
           );
          }}
        </Formik>
    </div>
   </div>
  )
}

export default AdminSetting