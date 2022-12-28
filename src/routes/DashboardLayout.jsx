import React, { useState,useEffect,useRef } from "react";
import axios from "axios";
import config from "../services/config.json";
import { Routes, Route,useNavigate } from "react-router-dom";
import AdminDatabase from "../AdminDatabase";
import AdminSetting from "../AdminSetting";
import AdminStatistics from "../AdminStatistics";
import AdminDashboard from "../components/common/AdminDashboard";
import AdminHeader from "../components/common/AdminHeader";
import Forget from "../components/common/Forget";
import {getTokenSession,removeTokenSession} from "../utils/common";
import LoginLayout from "./LoginLayout";
import { toast } from "react-toastify";
import Loader from "../components/common/Loader";

function DashboardLayout() {
  const [isLoggedin, setIsLoggedin] = useState(true);
  const isComponentMounted = useRef(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    !getTokenSession() && navigate(`/admin/login`);

    getData();
  }, []);

  const loginoutfunc = (e) => {
    removeTokenSession();
    setIsLoggedin(true);
    toast.success("logOut");
    navigate(`/admin/login`)
    };

  const getData = async () => {
      axios.defaults.headers = {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${getTokenSession()}`,
      };
      axios.get(`${config.apiEndPoint}profile/1`,)
         .then ((response) => {
           setLoading(false);
         
        })
        .catch((error) => {
          setLoading(true);
          removeTokenSession()
          if (error.response.status === 401)
          toast.error(error.response.data.message);
          else toast.error("Something went wrong. Please try again later.");
        });
  }
  if (loading) return <Loader />;
  return (
   <>

   <AdminHeader  logoutfun={loginoutfunc} />
   <Routes >
          <Route exact path="/*" element={<AdminDashboard />} />
          <Route  path="/setting" element={<AdminSetting />} />
          <Route  path="/statistics" element={<AdminStatistics />} />
          <Route  path="/database" element={<AdminDatabase />} />
          <Route  path="/forget" element={<Forget />} />
        </Routes>
  


   </>
  )
}

export default DashboardLayout