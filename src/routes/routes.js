import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import PortfolioListing from "../pages/PortfolioListing";
import PortfolioDetail from "../pages/PortfolioDetail";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Portfolio" element={<PortfolioListing />} />
      <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
    </Routes>
  );
};

export default AppRoutes;
