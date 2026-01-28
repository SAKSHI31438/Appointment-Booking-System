import React from "react";
import SuperAdminSideBar from "../Sidebar/SuperAdminSideBar";
import RegistrationForm from "./RegistrationForm";

const RegistrationPage = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen w-full">
      <div>
        <SuperAdminSideBar />
      </div>

      <div className=" w-full lg:not-only:ml-65">
        <RegistrationForm />{" "}
      </div>
    </div>
  );
};

export default RegistrationPage;
