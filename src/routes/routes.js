import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/Home" element={<Home />} />
      <Route path="/About" element={<About />} />
    </Routes>
  );
};

export default AppRoutes;
