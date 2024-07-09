import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../Screen/Dashboard/Dashboard";
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer"; 
const PrivateRouter = () => {
  return ( 
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter> 
  );
};

export default PrivateRouter;
