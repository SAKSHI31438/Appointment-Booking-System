import {
  CalendarCheck,
  CopySlashIcon,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const ProviderLayout = () => {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
    console.log(nav);
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // redirect to login page
    navigate("/");
  };
  return (
    <div>
      {" "}
      <div className="flex   lg:hidden">
        {!nav && (
          <Menu
            onClick={handleNav}
            className="w-8 h-8 cursor-pointer absolute right-7 top-6 text-[#540863] p-1 border border-gray-300 rounded-md"
          />
        )}
      </div>
      {nav && (
        <div className="flex lg:hidden h-screen w-[80%] bg-[#540863] fixed z-100 top-0 left-0 transform transition-all duration-500 ease-in-out">
          <div className="flex flex-col text-white w-full h-full space-y-4">
            <X
              onClick={handleNav}
              className="w-8 h-8 cursor-pointer absolute right-4 top-3 text-white p-1 border border-gray-300 rounded-md"
            />
            <div className="p-6 text-2xl font-bold border-b border-white/20">
              <Link to="/home">Super Admin</Link>
            </div>

            <nav className="mt-6 space-y-3 px-4 ">
              <Link
                to={"/register"}
                className="flex items-center  gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-white/10 transition"
              >
                <LayoutDashboard size={18} />
                <span className="text-md">Provider Registration</span>
              </Link>
              <Link
                to={"/category"}
                className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-white/10 transition"
              >
                <CopySlashIcon size={18} />

                <span className="text-md">Category</span>
              </Link>

              <Link
                to={"/admin"}
                className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-white/10 transition"
              >
                <CalendarCheck size={18} />
                <span className="text-md">Admin</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center w-full gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-white/10 transition"
              >
                <LogOut size={18} />
                <span className="text-md">Logout</span>
              </button>
            </nav>
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default ProviderLayout;
