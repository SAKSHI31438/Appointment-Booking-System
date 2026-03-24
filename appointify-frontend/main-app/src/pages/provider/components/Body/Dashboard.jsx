import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../Sidebar/SideBar";
import { CheckCircle, Clock, PhoneCall } from "lucide-react";
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
import { toast } from "react-toastify";

const Dashboard = () => {
  const [provider, setProvider] = useState(null);
  const [appointments, setAppointments] = useState([]);

  /* ---------------- FETCH PROVIDER ---------------- */

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

  /* ---------------- FETCH APPOINTMENTS ---------------- */

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/appointments/provider-appointments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setAppointments(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAppointments();
  }, []);

  /* ---------------- UPDATE STATUS ---------------- */

  const markCompleted = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/appointments/update-status/${id}`,
        { status: "completed" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success("Appointment status updated to completed");
      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: "completed" } : a)),
      );
    } catch (error) {
      console.log(error);
    }
  };

  /* ---------------- COUNTS ---------------- */

  const pendingCount = appointments.filter(
    (a) => a.status === "pending",
  ).length;

  const approvedCount = appointments.filter(
    (a) => a.status === "approved",
  ).length;

  const completedCount = appointments.filter(
    (a) => a.status === "completed",
  ).length;

  const totalAppointments = pendingCount + approvedCount;

  /* ---------------- UPCOMING APPROVED ---------------- */

  const upcomingAppointments = appointments
    .filter((a) => a.status === "approved")
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
    .slice(0, 5);

  return (
    <>
      <SideBar />

      <main className="flex-1 p-6 md:p-10 ml-0 md:ml-64 bg-gray-50 min-h-screen">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Dashboard Overview of {provider?.providerName}
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your appointments and customers
          </p>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Appointments" value={totalAppointments} />
          <StatCard title="Actual Visits" value={completedCount} />
          <StatCard title="Pending Requests" value={pendingCount} />
        </div>

        {/* Upcoming Appointments */}

        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-800">
              Upcoming Appointments
            </h2>
            <p className="text-sm text-gray-500">Latest approved bookings</p>
          </div>

          <div className="divide-y">
            {upcomingAppointments.length === 0 && (
              <p className="p-6 text-gray-500 text-sm">
                No upcoming appointments
              </p>
            )}

            {upcomingAppointments.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 hover:bg-gray-50 transition"
              >
                {/* LEFT INFO */}

                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">
                    {item.fullName}
                  </span>

                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <CalendarCheck size={14} />
                    {new Date(item.appointmentDate).toLocaleDateString()} •{" "}
                    <Clock size={14} /> {item.appointmentTime}
                  </span>

                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <PhoneCall size={14} /> {item.phoneNumber}
                  </span>
                </div>

                {/* RIGHT */}

                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                    Approved
                  </span>

                  <button
                    onClick={() => markCompleted(item._id)}
                    className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    <CheckCircle size={14} />
                    Complete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
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
