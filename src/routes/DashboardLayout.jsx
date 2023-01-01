import React, { useState,useEffect,useRef } from "react";
import axios from "axios";
import config from "../services/config.json";
import { Routes, Route,useNavigate } from "react-router-dom";
import AdminDatabase from "../dashboard/AdminDatabase";
import AdminSetting from "../dashboard/AdminSetting";
import AdminStatistics from "../dashboard/AdminStatistics";
import AdminDashboard from "../dashboard/AdminDashboard";
import AdminHeader from "../dashboard/components/common/AdminHeader";
import {getTokenSession,removeTokenSession} from "../dashboard/utils/common";
import { toast } from "react-toastify";
import Loader from "../dashboard/components/common/Loader";

function DashboardLayout() {
  const navigate = useNavigate();

  useEffect(() => {

    // !getTokenSession() && navigate(`/admin/login`);
  }, []);

  const loginoutfunc = (e) => {
    removeTokenSession();
    toast.success("logOut");
    // navigate(`/admin/login`)
    };


  return (
   <>

   <AdminHeader  logoutfun={loginoutfunc} />
   <Routes >
          <Route exact path="/*" element={<AdminDashboard />} />
          <Route  path="/setting" element={<AdminSetting />} />
          <Route  path="/statistics" element={<AdminStatistics />} />
          <Route  path="/database" element={<AdminDatabase />} />
        </Routes>
  


   </>
  )
}

export default DashboardLayout