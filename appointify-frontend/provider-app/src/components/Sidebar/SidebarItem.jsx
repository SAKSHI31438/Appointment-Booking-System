import React from "react";
import { Link } from "react-router-dom";

const SidebarItem = ({ icon, label, url }) => {
  return (
    <Link
      to={url}
      className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-white/10 transition"
    >
      {icon}
      <span className="text-sm">{label}</span>
    </Link>
  );
};

export default SidebarItem;
