import React from "react";
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

const SuperAdminSideBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // redirect to login page
    navigate("/");
  };
  return (
    <aside className="w-64 bg-[#540863] text-white min-h-screen hidden md:block fixed">
      <div className="p-6 text-2xl font-bold border-b border-white/20">
        <Link to="/home">Super Admin</Link>
      </div>

      <nav className="mt-6 space-y-2 px-4">
        <Link
          to={"/register"}
          className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-white/10 transition"
        >
          <LayoutDashboard size={18} />
          <span className="text-sm">Provider Registration</span>
        </Link>

        <Link
          to={"/admin"}
          className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-white/10 transition"
        >
          <CalendarCheck size={18} />
          <span className="text-sm">Admin</span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center w-full gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-white/10 transition"
        >
          <LogOut size={18} />
          <span className="text-sm">Logout</span>
        </button>
      </nav>
    </aside>
  );
};

export default SuperAdminSideBar;
