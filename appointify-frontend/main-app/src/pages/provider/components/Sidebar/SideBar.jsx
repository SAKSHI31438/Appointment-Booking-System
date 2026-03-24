import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import AppointmentForm from "./AppointmentForm";
import axios from "axios";

const SideBar = () => {
  const [formVisible, setFormVisible] = useState(false);

  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/serviceProvider/ProviderProfile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setProvider(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProvider();
  }, []);
  console.log(provider);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/provider";
    toast.success("Logout Successful ");
  };

  const handleBookAppointment = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first to Book Appointment");
      return;
    }

    setFormVisible(true);
  };
  return (
    <>
      <aside className="w-64 bg-[#540863] text-white min-h-screen hidden md:block fixed">
        <div className="p-6 text-2xl font-bold border-b border-white/20">
          Receptionist Panel
        </div>

        <nav className="mt-6 space-y-3 px-4 flex flex-col justify-between h-[calc(100vh-80px)] pb-10">
          <div className="space-y-1">
            <SidebarItem
              icon={<LayoutDashboard size={18} />}
              label="Dashboard"
              url="/provider/dashboard"
            />
            <SidebarItem
              icon={<CalendarCheck size={18} />}
              label="Appointments"
              url="/provider/appointments"
            />
            <Link
              onClick={() => handleBookAppointment()}
              className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-white/10 transition"
            >
              <Users size={18} />
              <span className="text-sm">Book an Appointment</span>
            </Link>
            {/* <SidebarItem icon={<Settings size={18} />} label="Settings" /> */}
            {/* <SidebarItem
          icon={<LogOut size={18} />}
          label="Logout"
          onClick={handleLogout}
        /> */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-white/10 transition text-left"
            >
              <LogOut size={18} />
              <span className="text-sm">Logout</span>
            </button>
          </div>
          <div>
            <Link
              to={"/provider/profile"}
              className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer bg-white/10 transition hover:bg-white/20"
            >
              <Users size={18} />
              <span className="text-sm">Profile</span>
            </Link>
          </div>
        </nav>
        {formVisible && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm 
    flex items-center justify-center z-1000 "
            onClick={() => setFormVisible(false)}
          >
            <div
              className="bg-white rounded-xl w-[90%] md:w-[60%] 
      max-h-[90vh] overflow-y-auto shadow-2xl relative  mb-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setFormVisible(false)}
                className="absolute top-3 right-3 p-1 rounded-full 
        bg-[#540863] text-white hover:bg-[#390644] transition"
              >
                <X className="h-5 w-5" />
              </button>

              <AppointmentForm
                id={provider._id}
                setFormVisible={setFormVisible}
              />
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default SideBar;
