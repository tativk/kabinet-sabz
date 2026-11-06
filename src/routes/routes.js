import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Portfolio from "../pages/Portfolio";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Portfolio" element={<Portfolio />} />
    </Routes>
  );
};

export default AppRoutes;
