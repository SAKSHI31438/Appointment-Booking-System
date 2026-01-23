import React from "react";
import Dashboard from "../Body/Dashboard";
import SideBar from "../Sidebar/SideBar";

const Home = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <SideBar />

      {/* Main Content */}
      <Dashboard />
    </div>
  );
};

export default Home;
