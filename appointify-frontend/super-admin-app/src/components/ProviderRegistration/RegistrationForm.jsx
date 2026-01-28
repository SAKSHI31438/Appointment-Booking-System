import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const router = useNavigate();

  const [formData, setFormData] = useState({
    providerName: "",
    category: "",
    shortDescription: "",
    fullDescription: "",
    phoneNumber: "",
    email: "",
    website: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    workingDays: [],
    openingTime: "",
    closingTime: "",
  });

  const toggleDay = (day) => {
    setFormData((prev) => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter((d) => d !== day)
        : [...prev.workingDays, day],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/serviceProvider/registerProvider",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      alert("Provider registered successfully ✅");

      router("/home");

      console.log(res.data);
    } catch (error) {
      console.error(error);

      alert(error.response.data.message || "Validation error");
    }
  };

  return (
    <div className="min-h-screen px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-800">
            Service Provider Registration
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Add and manage service providers
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-10 space-y-12">
          {/* BASIC INFO */}
          <Section title="Basic Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Provider Name"
                name="providerName"
                value={formData.providerName}
                onChange={handleChange}
              />

              <Select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                options={[
                  "Hospital",
                  "Clinic",
                  "Salon",
                  "Restaurant",
                  "Lab",
                  "Gym",
                ]}
              />
            </div>

            <Input
              label="Short Description"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
            />

            <Textarea
              label="Full Description"
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleChange}
            />
          </Section>

          {/* CONTACT */}
          <Section title="Contact Details">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <Input
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                label="Website"
                name="website"
                value={formData.website}
                onChange={handleChange}
              />
            </div>
          </Section>

          {/* ADDRESS */}
          <Section title="Address Details">
            <Input
              label="Address Line"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              <Input
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
              <Input
                label="Pincode"
                name="pincode"
                type="Number"
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>
          </Section>

          {/* BUSINESS */}
          <Section title="Business Details">
            <label className="label">Working Days</label>
            <div className="flex flex-wrap gap-3 mt-3">
              {days.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all
                    ${
                      formData.workingDays.includes(day)
                        ? "bg-[#540863] text-white scale-105"
                        : "bg-white border text-gray-700"
                    }`}
                >
                  {day}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Input
                label="Opening Time"
                type="time"
                name="openingTime"
                value={formData.openingTime}
                onChange={handleChange}
              />
              <Input
                label="Closing Time"
                type="time"
                name="closingTime"
                value={formData.closingTime}
                onChange={handleChange}
              />
            </div>
          </Section>

          {/* ACTIONS */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="reset"
              className="px-6 py-2.5 rounded-xl bg-gray-100 text-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-7 py-2.5 rounded-xl bg-[#540863] text-white shadow-lg hover:opacity-90"
            >
              Register Provider
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ---------- UI COMPONENTS ---------- */

const Section = ({ title, children }) => (
  <section>
    <h2 className="text-lg font-semibold text-gray-800 mb-6">{title}</h2>
    <div className="space-y-4">{children}</div>
  </section>
);

const Input = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="label">{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      className="input-soft"
    />
  </div>
);

const Textarea = ({ label, name, value, onChange }) => (
  <div>
    <label className="label">{label}</label>
    <textarea
      rows="4"
      name={name}
      value={value}
      onChange={onChange}
      className="input-soft resize-none"
    />
  </div>
);

const Select = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="label">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="input-soft"
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

export default RegistrationForm;
