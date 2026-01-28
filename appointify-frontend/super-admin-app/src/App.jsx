import { Route, Routes } from "react-router-dom";
import "./App.css";
import React from "react";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import RegistrationPage from "./components/ProviderRegistration/RegistrationPage";

function App() {
  return (
    <>
      <div className="overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/register" element={<RegistrationPage />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
