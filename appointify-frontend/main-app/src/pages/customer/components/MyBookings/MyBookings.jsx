import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, Clock, MapPin, Phone, Filter } from "lucide-react";

const MyBookings = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/appointments/getMyBookings`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setBookings(data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load bookings");
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  /* ---------------- CANCEL BOOKING ---------------- */
  const handleCancelBooking = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/appointments/cancel/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setBookings((prevBookings) =>
        prevBookings.map((item) =>
          item._id === id ? { ...item, status: "cancelled" } : item,
        ),
      );
    } catch (err) {
      console.error(err);
      alert("Failed to cancel booking");
    }
  };

  const filteredBookings =
    activeFilter === "All"
      ? bookings
      : bookings.filter((b) => b.status === activeFilter.toLowerCase());

  return (
    <div className="min-h-screen bg-[#FFD3D5] mt-20 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-[#540863]">My Bookings</h2>
            <p className="text-sm text-gray-700 mt-1">
              Manage and track all your appointments
            </p>
          </div>

          {/* FILTER */}
          <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-sm overflow-x-scroll md:overflow-x-hidden">
            <Filter size={16} className="text-[#540863]" />
            {["All", "Pending", "Approved", "Rejected", "Cancelled"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setActiveFilter(status)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                    activeFilter === status
                      ? "bg-[#540863] text-white"
                      : "text-gray-700 hover:bg-gray-100 "
                  }`}
                >
                  {status}
                </button>
              ),
            )}
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center text-gray-600">
            Loading bookings...
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center text-red-500">
            {error}
          </div>
        )}

        {/* BOOKINGS */}
        {!loading && !error && filteredBookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center text-gray-600">
            No bookings found.
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredBookings.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 border-l-4 border-[#540863]"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  {/* LEFT INFO */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-xl font-semibold text-[#540863]">
                        {item.providerId?.providerName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {item.providerId?.category}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        {item.providerId?.city}
                      </div>

                      <div className="flex items-center gap-1">
                        <Phone size={16} />
                        {item.providerId?.phoneNumber}
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

                    <p className="text-sm text-gray-600">
                      {item?.fullName} - {item?.email}
                    </p>

                    {item.notes && (
                      <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
                        <span className="font-medium text-gray-800">
                          Notes:
                        </span>{" "}
                        {item.notes}
                      </div>
                    )}

                    <p className="text-xs text-gray-400">
                      Booked on {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="flex flex-col items-end justify-between">
                    <StatusBadge status={item.status} />

                    {item.status === "pending" && (
                      <button
                        onClick={() => handleCancelBooking(item._id)}
                        className="mt-4 px-4 py-1.5 text-sm rounded-lg cursor-pointer border border-[#540863] text-[#540863] hover:bg-[#540863] hover:text-white transition"
                      >
                        Cancel Booking
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

export default MyBookings;

/* ---------------- STATUS BADGE ---------------- */

const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    approved: "bg-green-100 text-green-700 border border-green-300",
    rejected: "bg-red-100 text-red-700 border border-red-300",
    cancelled: "bg-red-100 text-red-700 border border-red-300",
  };

  return (
    <span
      className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
};
