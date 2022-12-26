import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import PlayBy from "../PlayBy";
import Submission from "../Submission";
import Home from "../Home";
import Topranking from "../components/common/Topranking";

function WebLayout() {
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
  return (
   <>
    <main onLoad={themeMode} className={theme} >
    <Routes >
          <Route exact path="/" element={<Home />} />
          <Route exact path="/playby" element={<PlayBy />} />
          <Route exact path="/topranking" element={<Topranking />} />
          <Route exact path="/submission" element={<Submission />} />
        </Routes>
        </main>
        </>
  )
}

export default WebLayout