import React,{useEffect} from 'react'
import axios from "axios";
import config from "../../services/config.json";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

function Forget() {

    const initialValues = {
        email: "",
      };
      const validationSchema = yup.object({
        email: yup.string().email("Invaild Email").required("Must Required"),
      })

      const  onSubmit  = async (values) => {
        axios.defaults.headers = {
          "Content-Type": "application/json",
        };
        axios
        
          .post(`${config.apiEndPoint}api-login.php`,
           values)
          .then((response) => {
            if( !response){toast.error(response.data.message); 
            }
            else {
              toast.success(response.data.message);
            }
           
            
          })
          .catch((error) => {
            if (error.response.status === 401)
            toast.error(error.response.data.message);
            else toast.error("Something went wrong. Please try again later.");
          });
      };
  return (
    <>
    <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnChange
        >
  {({ isSubmitting }) => {
      return (
          
          <Form className='mt-2 loginForm'>
                    <h1 className='text-center mb-4'>Forget Page</h1>
                    <div className='inputMain'>
                    <label>Email</label>
                    <div className="inputMainBox">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="effect-8"
                    />
                    </div>
                    <ErrorMessage name="email">
                    {(msg) => (
                      <div style={{ color: "red", whiteSpace: "nowrap" }}>
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                    </div>
                    <button
                    type="submit"
                    name="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    Submit
                    </button>
                       
                </Form>

);
}}
</Formik>
</>
  )
}

export default Forget