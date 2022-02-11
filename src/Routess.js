import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./sharedComponents/Home";

function Routess() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default Routess;
