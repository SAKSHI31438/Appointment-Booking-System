import { Route, Routes } from "react-router-dom";
import "./App.css";
import React from "react";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import RegistrationPage from "./components/ProviderRegistration/RegistrationPage";
import AddAdminPage from "./components/AddAdminPage/AddAdminPage";
import AddAdminForm from "./components/AddAdminPage/AddAdminForm";

function App() {
  return (
    <>
      <div className="overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/register" element={<RegistrationPage />}></Route>
          <Route path="/admin" element={<AddAdminPage />}></Route>
          <Route path="/add-admin" element={<AddAdminForm />}></Route>
          <Route path="/providers/view/:id" element={<RegistrationPage />} />
          <Route path="/admin/view/:id" element={<AddAdminForm />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
