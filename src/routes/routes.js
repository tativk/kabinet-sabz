import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import PortfolioListing from "../pages/PortfolioListing";
import PortfolioDetail from "../pages/PortfolioDetail";
import Contact from "../pages/Contact";

const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/Home" element={<Home />} />
      <Route path="/About" element={<About />} />
      <Route path="/Services" element={<Services />} />
      <Route path="/" element={<Home />} />
      <Route path="/Portfolio" element={<PortfolioListing />} />
      <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
      <Route path="/Contact" element={<Contact />} />



    </Routes>
  );
};

export default AppRoutes;
