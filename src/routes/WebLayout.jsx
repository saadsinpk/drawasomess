import React, { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import config from "../services/config.json";
import PlayBy from "../website/PlayBy";
import Submission from "../website/Submission";
import Home from "../website/Home";
import Topranking from "../website/components/common/Topranking";
import Congratulations from "../website/components/common/Congratulations";
import Loader from "../dashboard/components/common/Loader";
import {getUserToken,removeUserToken,setUserToken} from "../website/utils/common";
import { toast } from "react-toastify";
import { set } from "lodash";

function WebLayout() {
  const isComponentMounted = useRef(true);
  const [loading, setLoading] = useState(true);
        const [theme, setTheme] = useState("light");
        const themeMode = (e) => {
          const body = document.body;
          if (localStorage.getItem("theme") == "dark") {
            setTheme("dark");
            body.classList.add("active");
          }
          else {
            setTheme("light");
             body.classList.remove("active")
          }
        }
        useEffect(() => {
          if (isComponentMounted.current) {
            getDataa();
          }
          return () => {
            isComponentMounted.current = false;
            setLoading(true);
          };
        }, []);
        const getDataa = async () => {
          if(getUserToken()) {
            axios.defaults.headers = {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getUserToken()}`,
            };
          }
        axios.post(`${config.apiEndPoint2}getUserId`)
            .then((response) => {
              console.log(response.data)
              setUserToken(response.data.token)
              setLoading(false);
            })
            .catch((error) => {
              if (error?.response?.status === 500) {
                removeUserToken("usertoken");
              } else if (error?.response?.status === 401) {
                setLoading(true);
                toast.error(error.response.data.message);
              } else {
                setLoading(true);
                toast.error("Something went wrong. Please try again later.");
              }
            });
          }
            if (loading) return <Loader />;
  return (
   <>
    <main onLoad={themeMode} className={theme} >
    <Routes >
          <Route exact path="/" element={<Home />} />
          <Route exact path="/playby" element={<PlayBy />} />
          <Route exact path="/topranking" element={<Topranking />} />
          <Route exact path="/submission" element={<Submission />} />
          <Route exact path="/congratulations" element={<Congratulations />} />
        </Routes>
        </main>
        </>
  )
}

export default WebLayout