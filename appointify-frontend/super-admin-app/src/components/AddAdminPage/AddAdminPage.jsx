import React from "react";
import SuperAdminSideBar from "../Sidebar/SuperAdminSideBar";
import ListOfAdmin from "./ListOfAdmin";

const AddAdminPage = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen w-full">
      <div>
        <SuperAdminSideBar />
      </div>

      <div className=" w-full lg:not-only:ml-65">
        <ListOfAdmin />
      </div>
    </div>
  );
};

export default AddAdminPage;
