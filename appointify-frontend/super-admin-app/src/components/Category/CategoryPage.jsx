import React from "react";
import SuperAdminSideBar from "../Sidebar/SuperAdminSideBar";
import ListOfCategory from "./ListOfCategory";

const CategoryPage = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen w-full">
      <div>
        <SuperAdminSideBar />
      </div>

      <div className=" w-full lg:not-only:ml-65">
        <ListOfCategory />
      </div>
    </div>
  );
};

export default CategoryPage;
