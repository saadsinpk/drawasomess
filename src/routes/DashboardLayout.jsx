import React, { useState,useEffect } from "react";
import axios from "axios";
import config from "../services/config.json";
import { Routes, Route,useNavigate } from "react-router-dom";
import AdminDatabase from "../AdminDatabase";
import AdminSetting from "../AdminSetting";
import AdminStatistics from "../AdminStatistics";
import AdminDashboard from "../components/common/AdminDashboard";
import AdminHeader from "../components/common/AdminHeader";
import Forget from "../components/common/Forget";
import {getTokenSession,getidSession} from "../utils/common";
import LoginLayout from "./LoginLayout";

function DashboardLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // axios.defaults.headers = {
    //   "headers": `${getTokenSession()}`,
    // };
    // axios.post(`${config.apiEndPoint}login/`,
    //    values)
    //    .then((response) => {
    //     console.log(response)
    //     if( !response.data.token){
    //       removeTokenSession(response.data.token);
    //       toast.error(response.data.errorMessage); 
    //     }
    //     else {
    //       setTokenSession(response.data.token);
    //       toast.success(response.data.successMessage);
    //       navigate("/admin/dasboard");
    //     }
       
        
    //   })
    //   .catch((error) => {
    //     if (error.response.status === 401)
    //     toast.error(error.response.data.message);
    //     else toast.error("Something went wrong. Please try again later.");
    //   });
  }
    
  return (
   <>

   <AdminHeader data={"fa"} />
   <Routes >
          <Route exact path="/dashboard" element={<AdminDashboard />} />
          <Route exact path="/setting" element={<AdminSetting />} />
          <Route exact path="/statistics" element={<AdminStatistics />} />
          <Route exact path="/database" element={<AdminDatabase />} />
          <Route exact path="/login" element={<LoginLayout />} />
          <Route exact path="/forget" element={<Forget />} />
        </Routes>
  


   </>
  )
}

export default DashboardLayout