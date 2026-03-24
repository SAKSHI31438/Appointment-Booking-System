import React from "react";
import { Link } from "react-router-dom";

const SidebarItem = ({ icon, label, url, onClick }) => {
  return (
    <Link
      to={url}
      onAbort={onClick}
      className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-white/10 transition"
    >
      {icon}
      <span className="text-sm">{label}</span>
    </Link>
  );
};

export default SidebarItem;
