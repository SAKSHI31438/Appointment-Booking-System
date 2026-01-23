import React from "react";
import SideBar from "../Sidebar/SideBar";

const Appointments = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <SideBar />
      <div className="ml-0 md:ml-64">
        <h1>Total Appointments</h1>
      </div>
    </div>
  );
};

export default Appointments;
