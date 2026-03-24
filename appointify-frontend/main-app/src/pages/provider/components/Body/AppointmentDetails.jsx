import React from "react";
import { MapPin, Phone, Mail, Calendar, Clock } from "lucide-react";
import SideBar from "../Sidebar/SideBar";
import { Link } from "react-router-dom";

const AppointmentDetails = () => {
  const appointment = {
    customerName: "Rahul Sharma",
    age: 32,
    gender: "Male",
    phone: "+91 98765 43210",
    email: "rahul.sharma@gmail.com",
    city: "Mumbai",

    serviceName: "City Care Hospital",
    serviceCategory: "Healthcare Services",
    subCategory: "Cardiology Consultation",
    doctor: "Dr. Anil Mehta",

    appointmentDate: "15 January 2026",
    appointmentTime: "10:30 AM",
    bookingId: "APT-2026-1458",
    paymentStatus: "Paid",
    consultationFee: "₹1200",
    appointmentStatus: "Pending",

    notes:
      "Patient is experiencing chest discomfort and shortness of breath for the last 2 days.",
  };

  return (
    <div className="flex bg-gray-50 min-h-screen ">
      <SideBar />
      <div className="max-w-6xl mx-auto px-6 py-10 ml-0 md:ml-64">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Appointment Details
          </h1>
          <p className="text-gray-500 mt-1">
            Complete information about the booked appointment
          </p>
        </div>

        {/* Status Bar */}
        <div className="flex flex-col md:flex-row justify-between gap-4 bg-white border rounded-xl p-6 mb-8">
          <div>
            <p className="text-sm text-gray-500">Booking ID</p>
            <p className="font-semibold">{appointment.bookingId}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Appointment Status</p>
            <span className="inline-block mt-1 px-3 py-1 text-sm rounded-full bg-yellow-50 text-yellow-600">
              {appointment.appointmentStatus}
            </span>
          </div>

          <div>
            <p className="text-sm text-gray-500">Payment Status</p>
            <span className="inline-block mt-1 px-3 py-1 text-sm rounded-full bg-green-50 text-green-600">
              {appointment.paymentStatus}
            </span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Customer Details */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Customer Information
            </h2>

            <Detail label="Name" value={appointment.customerName} />
            <Detail
              label="Age / Gender"
              value={`${appointment.age} / ${appointment.gender}`}
            />

            <div className="flex items-center gap-2 text-sm text-gray-600 mt-3">
              <Phone size={16} />
              <span>{appointment.phone}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
              <Mail size={16} />
              <span>{appointment.email}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
              <MapPin size={16} />
              <span>{appointment.city}</span>
            </div>
          </div>

          {/* Service Details */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Service Details
            </h2>

            <Detail label="Service Provider" value={appointment.serviceName} />
            <Detail label="Category" value={appointment.serviceCategory} />
            <Detail label="Service Type" value={appointment.subCategory} />
            <Detail label="Consulting Doctor" value={appointment.doctor} />
          </div>

          {/* Appointment Info */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Appointment Information
            </h2>

            <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
              <Calendar size={16} />
              <span>{appointment.appointmentDate}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
              <Clock size={16} />
              <span>{appointment.appointmentTime}</span>
            </div>

            <Detail
              label="Consultation Fee"
              value={appointment.consultationFee}
            />
          </div>

          {/* Notes */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Customer Notes
            </h2>

            <p className="text-sm text-gray-600 leading-relaxed">
              {appointment.notes}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <button className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
            Accept Appointment
          </button>

          <button className="w-full sm:w-auto bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition">
            Reject Appointment
          </button>

          <Link
            to={"/"}
            className="w-full sm:w-auto border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div className="mt-3">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium text-gray-800">{value}</p>
  </div>
);

export default AppointmentDetails;
