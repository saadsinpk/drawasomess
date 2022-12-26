
import React,{useEffect} from 'react'
import axios from "axios";
import config from "../services/config.json";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { setTokenSession,getTokenSession,removeTokenSession } from "../utils/common";
import { toast } from "react-toastify";


import AdminHeader from '../components/common/AdminHeader';

function LoginLayout() {
    const navigate = useNavigate();
   
      useEffect(() => {
      getTokenSession() && navigate(`/admin/dasboard`);
    }, []);
    const initialValues = {
        fname: "",
        password: "",
      };
      const validationSchema = yup.object({
        email: yup.string().email("Invaild Email").required("Must Required"),
        password: yup.string().min(5, "Mininum 5 length").max(20, "Maximum 20 length").required("Must Required"),
      });
      const  onSubmit  = async (values) => {
        axios.defaults.headers = {
          "Content-Type": "application/json",
        };
        axios
        
          .post(`${config.apiEndPoint}api-login.php`,
           values)
          .then((response) => {
            if( !response.data.token){
              removeTokenSession(
                response.data.token,response.data.success
              );
              toast.error(response.data.message); 
            }
            else {
              setTokenSession(
                response.data.token,response.data.success
              );
              toast.success(response.data.message);
              navigate("/admin/dasboard");
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
    <main className='dashboard '>
    <AdminHeader data="d" />
    <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnChange
        >
  {({ isSubmitting }) => {
            return (
                <Form className='mt-5 loginForm'>
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
                    <div className='inputMain'>
                    <label>Password</label>
                    <div className="inputMainBox">
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="effect-8"
                    />
                    </div>
                       <ErrorMessage name="password">
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
                    Login
                  </button>
                </Form>

                );
            }}
        </Formik>
    <div className='login'></div>
    </main>
    </>
  )
}

export default LoginLayout