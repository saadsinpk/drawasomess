import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../components/common/AdminDashboard";
import AdminHeader from "../components/common/AdminHeader";

function DashboardLayout() {

    
  return (
   <>

   <AdminHeader data={"fa"} />
   <Routes >
          <Route exact path="/dashboard" element={<AdminDashboard />} />
          <Route exact path="/setting" element={<AdminDashboard />} />
        </Routes>
  


   </>
  )
}

export default DashboardLayout