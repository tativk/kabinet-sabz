import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/routes';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="App">
        <div className="site-shell">
          <div className="site-main"><AppRoutes /></div>
        </div>
      </div>
    </BrowserRouter>
  );
}
