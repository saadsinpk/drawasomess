import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Statistics from "./Statistics";
function App() {
  return (
    <>
    <main>
    <Routes >
    <Route exact path="/" element={<Home />} />
    <Route  path="/statistics" element={<Statistics />} />
  </Routes>
  </main>
  </>
  );
}

export default App;
