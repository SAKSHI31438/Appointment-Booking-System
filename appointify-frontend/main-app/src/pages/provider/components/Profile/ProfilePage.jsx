import React from "react";
import SideBar from "../Sidebar/SideBar";
import Profile from "./Profile";

const ProfilePage = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <SideBar />

      <Profile />
    </div>
  );
};

export default ProfilePage;
