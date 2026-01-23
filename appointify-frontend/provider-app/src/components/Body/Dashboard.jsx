import React, { useState } from "react";

import { CheckCircle } from "lucide-react";
import SideBar from "../Sidebar/SideBar";
import { IoReorderThreeOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import SidebarItem from "../Sidebar/SidebarItem";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
    console.log(nav);
  };

  const appointments = [
    {
      id: 1,
      name: "Rahul Sharma",
      date: "15 Jan 2026",
      time: "10:30 AM",
      status: "Pending",
    },
    {
      id: 2,
      name: "Anita Verma",
      date: "15 Jan 2026",
      time: "12:00 PM",
      status: "Pending",
    },
    {
      id: 3,
      name: "Mohit Jain",
      date: "16 Jan 2026",
      time: "09:15 AM",
      status: "Pending",
    },
    {
      id: 4,
      name: "Pooja Singh",
      date: "16 Jan 2026",
      time: "04:00 PM",
      status: "Pending",
    },
    {
      id: 5,
      name: "Amit Patel",
      date: "17 Jan 2026",
      time: "11:45 AM",
      status: "Pending",
    },
  ];

  return (
    <>
      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 ml-0 md:ml-64">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your appointments and customers
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Appointments" value="128" />
          <StatCard title="Actual Visits" value="92" />
          <StatCard title="Pending Requests" value="14" />
        </div>

        {/* Appointment List */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-800">
              Upcoming Appointments
            </h2>
            <p className="text-sm text-gray-500">
              Latest customer booking requests
            </p>
          </div>

          <div className="divide-y">
            {appointments.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-4"
              >
                <div>
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    {item.date} • {item.time}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm px-3 py-1 rounded-full bg-yellow-50 text-yellow-600">
                    {item.status}
                  </span>

                  <Link
                    to={"/details"}
                    className="flex items-center gap-2 cursor-pointer bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    <CheckCircle size={16} />
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex   lg:hidden">
          {!nav && (
            <IoReorderThreeOutline
              onClick={handleNav}
              className="w-8 h-8 cursor-pointer absolute right-7 top-6 text-[#540863] p-1 border border-gray-300 rounded-md"
            />
          )}
        </div>
        {nav && (
          <div className="flex lg:hidden h-screen w-[80%] bg-[#540863] fixed z-100 top-0 left-0 transform transition-all duration-500 ease-in-out">
            <div className="flex flex-col text-white w-full h-full space-y-4">
              <RxCross2
                onClick={handleNav}
                className="w-8 h-8 cursor-pointer absolute right-4 top-3 text-white p-1 border border-gray-300 rounded-md"
              />
              <div className="p-6 text-2xl font-bold border-b border-white/20">
                Provider Panel
              </div>

              <nav className="mt-6 space-y-4 px-4">
                <SidebarItem
                  icon={<LayoutDashboard size={18} />}
                  label="Dashboard"
                />
                <SidebarItem
                  icon={<CalendarCheck size={18} />}
                  label="Appointments"
                />
                <SidebarItem icon={<Users size={18} />} label="Customers" />
                <SidebarItem icon={<Settings size={18} />} label="Settings" />
                <SidebarItem icon={<LogOut size={18} />} label="Logout" />
              </nav>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-3xl font-bold text-[#540863] mt-2">{value}</p>
  </div>
);

export default Dashboard;
