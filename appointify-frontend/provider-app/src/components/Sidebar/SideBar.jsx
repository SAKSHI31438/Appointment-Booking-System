import React from "react";
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import SidebarItem from "./SidebarItem";

const SideBar = () => {
  return (
    <aside className="w-64 bg-[#540863] text-white min-h-screen hidden md:block fixed">
      <div className="p-6 text-2xl font-bold border-b border-white/20">
        Provider Panel
      </div>

      <nav className="mt-6 space-y-2 px-4">
        <SidebarItem
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
          url="/"
        />
        <SidebarItem
          icon={<CalendarCheck size={18} />}
          label="Appointments"
          url="/appointments"
        />
        <SidebarItem icon={<Users size={18} />} label="Customers" />
        <SidebarItem icon={<Settings size={18} />} label="Settings" />
        <SidebarItem icon={<LogOut size={18} />} label="Logout" />
      </nav>
    </aside>
  );
};

export default SideBar;
