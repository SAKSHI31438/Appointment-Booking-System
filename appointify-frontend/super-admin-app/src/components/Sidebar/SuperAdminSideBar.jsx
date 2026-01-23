import React from "react";
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import SuperSidebarItem from "./SuperAdminSidebarItem";

const SuperAdminSideBar = () => {
  return (
    <aside className="w-64 bg-[#540863] text-white min-h-screen hidden md:block fixed">
      <div className="p-6 text-2xl font-bold border-b border-white/20">
        Super Admin
      </div>

      <nav className="mt-6 space-y-2 px-4">
        <SuperSidebarItem
          icon={<LayoutDashboard size={18} />}
          label="Provider Registration"
          url="/"
        />
        <SuperSidebarItem
          icon={<CalendarCheck size={18} />}
          label="Staff"
          url="/"
        />
        <SuperSidebarItem icon={<LogOut size={18} />} label="Logout" />
      </nav>
    </aside>
  );
};

export default SuperAdminSideBar;
