import { Route, Routes } from "react-router-dom";
import "./App.css";
import React from "react";
import Home from "./components/Home/Home";
import AboutUsPage from "./components/AboutUs/AboutUsPage";
import ContactUsPage from "./components/ContactUs/ContactUsPage";
import ServicePage from "./components/Services/ServicePage";
import Login from "./components/Login/Login";
import SignUp from "./components/Login/SignUp";
import { ToastContainer } from "react-toastify";
import ProviderDetailsPage from "./components/Services/ProviderDetailsPage";

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
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/provider/:id" element={<ProviderDetailsPage />}></Route>
        </Routes>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
