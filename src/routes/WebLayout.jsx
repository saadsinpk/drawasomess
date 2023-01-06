import React, { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import config from "../services/config.json";
import PlayBy from "../website/PlayBy";
import Submission from "../website/Submission";
import Home from "../website/Home";
import Topranking from "../website/components/common/Topranking";
import Congratulations from "../website/Congratulations";
import Loader from "../dashboard/components/common/Loader";
import {getUserToken,removeUserToken,setUserToken} from "../website/utils/common";
import { toast } from "react-toastify";
import Faq from "../website/Faq";
import Setting from "../website/components/common/Setting";

function WebLayout() {
  const [themeMode, setThemeMode] = useState(( eval( localStorage.getItem("switch"))))
  const isComponentMounted = useRef(true);
  const [uesrname, setUesrname] = useState("");
  const [settingModal, setSettingModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [datauser, setDatauser] = useState("")
  const [todayGameShoe, setTodayGameShoe] = useState("")

        useEffect(() => {

          if (isComponentMounted.current) {
            getDatass();  
          }
          return () => {
            isComponentMounted.current = false;
            setLoading(true);
          };
        }, []);
        const getDatass = async () => {
            axios.defaults.headers = {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${getUserToken()}`,
            };
        axios.get(`${config.apiEndPoint2}getUserId`)
            .then((response) => {
              setDatauser(response.data)
              const body = document.body;
             
              if(themeMode == true) {
                body.classList.add("active")
            }
            else {
                localStorage.removeItem('theme')
                body.classList.remove("active")
            }
              console.log(response.data)
              if(response.data.token) {
                setUserToken(response.data.token)
              }
              if(response.data.username) {
                setUesrname(response.data.username)
              }
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
            const SettingtoggleClass = (e) => {
              setSettingModal(true)
              };
  return (
   <>
    <main  >
    {settingModal && <Setting popuptext={"Setting"} elel={uesrname} closeSetting={setSettingModal}   />}  
    <Routes >
          <Route exact path="/" element={<Home data={uesrname} gameto={todayGameShoe}  settingclick={SettingtoggleClass} />} />
          <Route exact path="/playby" element={<PlayBy data={uesrname} gameto={todayGameShoe}  settingclick={SettingtoggleClass} />} />
          <Route exact path="/topranking" element={<Topranking  data={uesrname}  settingclick={SettingtoggleClass} />} />
          <Route exact path="/submission" element={<Submission data={uesrname}  settingclick={SettingtoggleClass} />} />
          <Route exact path="/congratulations" element={<Congratulations data={uesrname} gameto={todayGameShoe}  settingclick={SettingtoggleClass} />} />
          <Route exact path="/faq" element={<Faq data={uesrname}  settingclick={SettingtoggleClass} />} />
        </Routes>
        </main>
        </>
  )
}

export default WebLayout