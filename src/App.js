import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/routes";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <div className="App">
        <div className="site-shell">
          <Header />

          <div className="site-main">
            <AppRoutes />
          </div>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
