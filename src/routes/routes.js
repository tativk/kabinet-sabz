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
import Consultation from "../pages/Consultation";
import FAQ from "../pages/FAQ";
import Terms from "../pages/Terms";
import ProjectRequest from "../pages/ProjectRequest";


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
      <Route path="/consultation" element={<Consultation />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/Terms" element={<Terms />} />
      <Route path="/project-request" element={<ProjectRequest />} />

      
    </Routes>
  );
};

export default AppRoutes;
