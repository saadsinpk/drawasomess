import React from 'react';
import { Link } from "react-router-dom";

function Topplayers() {
  return (
    <div className="section1Box">
    <h2>See today’s top 30 players so far by clicking <Link to={"/topranking"}>here</Link></h2>
    </div>
  )
}

export default Topplayers