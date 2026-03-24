import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AppointmentForm = ({ id, setFormVisible }) => {
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    phoneNumber: "",
    email: "",
    city: "",
    appointmentDate: "",
    appointmentTime: "",
    notes: "",
  });

  /* ---------------- FETCH PROVIDER ---------------- */
  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/serviceProvider/getProviderById/${id}`,
        );
        setProvider(res.data.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProvider();
  }, [id]);

  /* ---------------- HANDLE CHANGE ---------------- */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ---------------- HANDLE SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/appointments/createAppointment`,
        {
          ...formData,
          providerId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.data.success) {
        toast.success("Appointment Booked Successfully ");
        navigate("/provider/appointments");
        window.location.reload();
      }

      setFormVisible(false);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="bg-white rounded-xl w-full mx-auto">
      {/* HEADER */}
      <div className="bg-[#540863] text-white px-7 py-5">
        <h2 className="text-xl font-semibold">Book Appointment</h2>
        <p className="text-sm opacity-90">
          Fill in your details to confirm booking
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-10 max-h-[85vh]">
        {/* CUSTOMER INFO */}
        <section>
          <h3 className="section-title">Customer Information</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />

            <div className="flex gap-4">
              <Input
                label="Age"
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />

              <Select
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                options={["male", "female", "other"]}
              />
            </div>

            <Input
              label="Phone Number"
              type="tel"
              name="phoneNumber"
              maxLength={10}
              value={formData.phoneNumber}
              onChange={handleChange}
            />

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              label="City"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              full
            />
          </div>
        </section>

        {/* SERVICE DETAILS */}
        <section>
          <h3 className="section-title">Service Details</h3>

          {loading && (
            <p className="text-center py-6 text-gray-500">
              Loading provider details...
            </p>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Service Provider"
              readOnly
              value={provider?.providerName}
            />
            <Input
              label="Category"
              readOnly
              value={provider?.category || "N/A"}
            />
            <Input
              label="Service Type"
              full
              readOnly
              value={provider?.subCategory || "N/A"}
            />
          </div>
        </section>

        {/* APPOINTMENT INFO */}
        <section>
          <h3 className="section-title">Appointment Information</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Date"
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
            />
            <Input
              label="Time"
              type="time"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
            />
          </div>
        </section>

        {/* NOTES */}
        <section>
          <h3 className="section-title">Additional Notes</h3>

          <textarea
            rows="4"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="input-style resize-none"
          />
        </section>

        {/* BUTTONS */}
        <div className="flex justify-end gap-4 pt-6 border-t mb-10 pb-10">
          <button
            type="button"
            onClick={() => setFormVisible(false)}
            className="px-6 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-100 transition text-black"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-7 py-2.5 rounded-lg bg-[#540863] text-white font-medium hover:bg-[#3d0549] transition shadow-md"
          >
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;

/* ---------------- INPUT COMPONENT ---------------- */

const Input = ({
  label,
  type = "text",
  readOnly,
  full,
  value,
  name,
  onChange,
  maxLength,
}) => (
  <div className={full ? "md:col-span-2" : ""}>
    <label className="label">{label}</label>
    <input
      type={type}
      name={name}
      readOnly={readOnly}
      value={value || ""}
      onChange={onChange}
      maxLength={maxLength}
      className={`input-style ${readOnly ? "bg-gray-50" : ""}`}
    />
  </div>
);

/* ---------------- SELECT COMPONENT ---------------- */

const Select = ({ label, options, name, value, onChange }) => (
  <div>
    <label className="label">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="input-style"
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);
