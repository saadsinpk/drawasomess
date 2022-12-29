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
  const [isLoggedin, setIsLoggedin] = useState(true);
  const [data,setData] = useState("")
  const isComponentMounted = useRef(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    !getTokenSession() && navigate(`/admin/login`);

    getData();
  }, [data]);

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
          // setData(response.data)
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
        </Routes>
  


   </>
  )
}

export default DashboardLayout