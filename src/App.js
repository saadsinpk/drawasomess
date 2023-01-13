import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import WebLayout from "./routes/WebLayout";
import LoginLayout from "./routes/LoginLayout";
import DashboardLayout from "./routes/DashboardLayout";
import Forget from "./dashboard/components/Forget";
import Demo from "./website/Demo";
function App() {
  injectStyle();
  return (
    <>
        <Routes>
            <Route path="/admin/*" element={<DashboardLayout />} />
            <Route path="/admin/login" element={<LoginLayout />} />
            <Route path="/admin/forget" element={<Forget />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="*" element={<WebLayout />} />
          </Routes>
            <ToastContainer />
    </>
  );
}

export default App;
