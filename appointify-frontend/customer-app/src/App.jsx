import { Route, Routes } from "react-router-dom";
import "./App.css";
import React from "react";
import Home from "./components/Home/Home";
import AboutUsPage from "./components/AboutUs/AboutUsPage";
import ContactUsPage from "./components/ContactUs/ContactUsPage";
import ServicePage from "./components/Services/ServicePage";
import Login from "./components/Login/Login";

function App() {
  return (
    <>
      <div className="overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<AboutUsPage />}></Route>
          <Route path="/contact" element={<ContactUsPage />}></Route>
          <Route path="/services" element={<ServicePage />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
