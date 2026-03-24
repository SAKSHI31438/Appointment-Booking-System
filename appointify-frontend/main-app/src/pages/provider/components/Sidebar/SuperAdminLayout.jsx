import axios from "axios";
import {
  CalendarCheck,
  CopySlashIcon,
  LayoutDashboard,
  LogOut,
  Menu,
  Users,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AppointmentForm from "./AppointmentForm";

const SuperAdminLayout = () => {
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
    navigate("/provider");
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
    <div>
      {" "}
      <div className="flex   lg:hidden">
        {!nav && (
          <Menu
            onClick={handleNav}
            className="w-8 h-8 cursor-pointer absolute right-5 top-6 text-[#540863] p-1 border border-gray-300 rounded-md"
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
              <Link to="/provider/dashboard">Receptionist Panel</Link>
            </div>

            <nav className="mt-6 space-y-3 px-4 flex flex-col justify-between h-[calc(100vh-80px)] pb-10 ">
              <div className="space-y-1">
                <Link
                  to={"/provider/dashboard"}
                  className="flex items-center  gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-white/10 transition"
                >
                  <LayoutDashboard size={18} />
                  <span className="text-md">Dashboard</span>
                </Link>
                <Link
                  to={"/provider/appointments"}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-white/10 transition"
                >
                  <CalendarCheck size={18} />

                  <span className="text-md">Appointments</span>
                </Link>

                <Link
                  onClick={() => handleBookAppointment()}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-white/10 transition"
                >
                  <Users size={18} />
                  <span className="text-md">Book an Appointment</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center w-full gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-white/10 transition"
                >
                  <LogOut size={18} />
                  <span className="text-md">Logout</span>
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
          </div>
        </div>
      )}
      <Outlet />
      {formVisible && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm 
    flex items-center justify-center z-[1000] "
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
    </div>
  );
};

export default SuperAdminLayout;
