import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../Sidebar/SideBar";
import {
  Calendar,
  Clock,
  Phone,
  User,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  // ✅ SOCKET INSTANCE
  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_API_URL}`);

    // 🟢 NEW APPOINTMENT LISTENER
    socket.on("newAppointment", (newAppointment) => {
      setAppointments((prev) => {
        // ❌ duplicate avoid
        const exists = prev.some((a) => a._id === newAppointment._id);
        if (exists) return prev;

        return [newAppointment, ...prev];
      });

      toast.info("New Appointment Received 🔔");
    });

    // 🟡 STATUS UPDATE LISTENER (optional but useful)
    socket.on("appointmentUpdated", (updated) => {
      setAppointments((prev) =>
        prev.map((a) =>
          a._id === updated._id ? { ...a, status: updated.status } : a,
        ),
      );
    });

    return () => socket.disconnect();
  }, []);

  const statusCounts = {
    all: appointments.length,
    pending: appointments.filter((a) => a.status === "pending").length,
    approved: appointments.filter((a) => a.status === "approved").length,
    rejected: appointments.filter((a) => a.status === "rejected").length,
    completed: appointments.filter((a) => a.status === "completed").length,
  };

  /* ---------------- FETCH APPOINTMENTS ---------------- */

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

      const filtered = data.data.filter(
        (appointment) => appointment.status !== "cancelled",
      );

      setAppointments(filtered);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadAppointments = async () => {
      await fetchAppointments();
    };
    loadAppointments();
  }, []);

  /* ---------------- UPDATE STATUS ---------------- */

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/appointments/update-status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.success) {
        toast.success("Appointment status updated to " + status);
      }

      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, status: status } : appt,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  /* ---------------- FILTER ---------------- */

  const filteredAppointments =
    activeFilter === "All"
      ? appointments
      : appointments.filter((a) => a.status === activeFilter.toLowerCase());

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <SideBar />

      <div className="ml-0 md:ml-64 w-full p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#540863]">
            {"Total Appointments : " + filteredAppointments.length}
          </h1>
          <p className="text-gray-600 mt-1">
            Manage all your customer bookings
          </p>
        </div>

        {/* FILTER */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {[
            { label: "All", key: "all" },
            { label: "Pending", key: "pending" },
            { label: "Approved", key: "approved" },
            { label: "Rejected", key: "rejected" },
            { label: "Completed", key: "completed" },
          ].map((status) => (
            <button
              key={status.label}
              onClick={() => setActiveFilter(status.label)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                activeFilter === status.label
                  ? "bg-[#540863] text-white"
                  : "bg-white border hover:bg-gray-100"
              }`}
            >
              {status.label} ({statusCounts[status.key]})
            </button>
          ))}
        </div>

        {/* DATA */}
        {loading ? (
          <div className="text-center text-gray-500">
            Loading appointments...
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow text-center text-gray-500">
            No appointments found
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredAppointments.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border-l-4 border-[#540863]"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="space-y-3">
                    <h2 className="text-xl font-semibold text-[#540863]">
                      {item.fullName}
                    </h2>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                      <div className="flex items-center gap-1">
                        <User size={16} />
                        {item.gender} • {item.age} yrs
                      </div>

                      <div className="flex items-center gap-1">
                        <Phone size={16} />
                        {item.phoneNumber}
                      </div>

                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        {new Date(item.appointmentDate).toLocaleDateString()}
                      </div>

                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        {item.appointmentTime}
                      </div>
                    </div>

                    {item.notes && (
                      <div className="bg-gray-100 p-3 rounded-lg text-sm">
                        <b>Notes:</b> {item.notes}
                      </div>
                    )}

                    <p className="text-xs text-gray-400">
                      Booked on {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <StatusBadge status={item.status} />

                    {item.status === "pending" && (
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => updateStatus(item._id, "approved")}
                          className="flex items-center gap-1 px-4 py-1.5 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700"
                        >
                          <CheckCircle size={16} />
                          Accept
                        </button>

                        <button
                          onClick={() => updateStatus(item._id, "rejected")}
                          className="flex items-center gap-1 px-4 py-1.5 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700"
                        >
                          <XCircle size={16} />
                          Reject
                        </button>
                      </div>
                    )}

                    {item.status === "approved" && (
                      <button
                        onClick={() => updateStatus(item._id, "completed")}
                        className="mt-4 px-4 py-1.5 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Mark as Completed
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;

/* STATUS BADGE */

const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    cancelled: "bg-gray-200 text-gray-700",
    completed: "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`px-4 py-1 rounded-full text-sm font-medium capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
};
