import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import PortfolioListing from "../pages/PortfolioListing";
import PortfolioDetail from "../pages/PortfolioDetail";
import Contact from "../pages/Contact";
import HomeOriginal from "../pages/HomeOriginal";
import Products from "../pages/Products";
import Sample from "../pages/Sample";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/About" element={<About />} />
      <Route path="/Services" element={<Services />} />
      <Route path="/" element={<Home />} />
      <Route path="/Portfolio" element={<PortfolioListing />} />
      <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/HomeOriginal" element={<HomeOriginal />} />
      <Route path="/Products" element={<Products />} />
      <Route path="/Sample" element={<Sample />} />
      
    </Routes>
  );
};

export default AppRoutes;
