import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Statistics from "./components/common/Statistics";
import HowToPlay from "./components/common/HowToPlay";
function App() {
  const [theme, setTheme] = useState("light")
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
      <main onLoad={themeMode} className={theme}>
        <Routes >
          <Route exact path="/" element={<Home />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
