import React from "react";
import SuperAdminSideBar from "../Sidebar/SuperAdminSideBar";
import RegistrationForm from "../ProviderRegistration/RegistrationPage";
import { Route, Routes } from "react-router-dom";
import ListOfServiceProviders from "./ListOfServiceProviders";

const Home = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <div>
        <SuperAdminSideBar />
      </div>

      <div className=" w-full lg:not-only:ml-65">
        <ListOfServiceProviders />
      </div>
    </div>
  );
};

export default Home;
