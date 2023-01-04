import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../services/config.json";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import {
  setTokenSession,
  getTokenSession,
  removeTokenSession,
} from "../dashboard/utils/common";
import { toast } from "react-toastify";
import AdminHeader from "../dashboard/components/common/AdminHeader";

function LoginLayout() {
  const [submitbutton, setSubmitbutton] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    getTokenSession() && navigate(`/admin/dashboard`);
  }, []);
  const initialValues = {
    username: "",
    password: "",
  };
  const validationSchema = yup.object({
    password: yup
      .string()
      .min(5, "Mininum 5 length")
      .max(20, "Maximum 20 length")
      .required("Must Required"),
  });
  const onSubmit = async (values,{ setSubmitting }) => {
    setSubmitbutton(true)
    axios.defaults.headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${config.apiEndPoint}login/`, values)
      .then((response) => {
        if (!response.data.token) {
          setSubmitbutton(false)
          removeTokenSession(response.data.token);
          toast.error(response.data.errorMessage);
        } else {
          setTokenSession(response.data.token);
          toast.success(response.data.successMessage);
          navigate("/admin/dasboard");
        }
      })
      .catch((error) => {
        if (error.response.status === 401)
          toast.error(error.response.data.message);
        else toast.error(error.response.data.errorMessage);
      });
  };
  return (
    <>
      <AdminHeader data={"fa"} />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange
      >
        {({ isSubmitting }) => {
          return (
            <Form className="mt-5 loginForm">
              <div className="inputMain">
                <label>Email</label>
                <div className="inputMainBox">
                  <Field
                    type="text"
                    name="username"
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
              <div className="inputMain">
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
              <div className="flex justify-between">
                <button
                  type="submit"
                  name="submit"
                  className="btn btn-primary"
                  disabled={submitbutton}
                >
                  {submitbutton ? "login..." : "login"}
                </button>
                <Link to={"/admin/forget"}>Forget Password</Link>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default LoginLayout;
