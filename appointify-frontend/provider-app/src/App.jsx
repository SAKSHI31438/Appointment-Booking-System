import { Route, Routes } from "react-router-dom";
import "./App.css";
import React from "react";
import Dashboard from "./components/Body/Dashboard";
import Home from "./components/Home/Home";
import Appointments from "./components/Body/Appointments";
import AppointmentDetails from "./components/Body/AppointmentDetails";

function App() {
  return (
    <>
      <div className="overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/appointments" element={<Appointments />}></Route>
          <Route path="/details" element={<AppointmentDetails />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
