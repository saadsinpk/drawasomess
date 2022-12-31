import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import PlayBy from "../website/PlayBy";
import Submission from "../website/Submission";
import Home from "../website/Home";
import Topranking from "../website/components/common/Topranking";
import Congratulations from "../website/components/common/Congratulations";

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
          <Route exact path="/congratulations" element={<Congratulations />} />
        </Routes>
        </main>
        </>
  )
}

export default WebLayout