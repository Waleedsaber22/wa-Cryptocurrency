import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Layout } from "antd";
import "./App.css";
import {
  Navbar,
  HomePage,
  Exchanges,
  Cryptocurrencies,
  News,
  CryptoDetails,
} from "./components";
import Footer from "./components/Footer";
import useMediaQuery from "@mui/material/useMediaQuery";
const App = () => {
  const isMobile = useMediaQuery("(max-width:778px)");
  return (
    <Router>
      <div className="app">
        <div className="app--navbar">
          <Navbar />
        </div>
        <div className="app--main">
          <Layout
            style={{
              minHeight: isMobile
                ? `calc(100vh - 119px)`
                : `calc(100vh - 54px)`,
            }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="/exchanges" element={<Exchanges />} />
              <Route path="/crypto/:coinid" element={<CryptoDetails />} />
              <Route path="/news" element={<News />} />
            </Routes>
          </Layout>
          <div className="app--footer">
            <Footer />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
