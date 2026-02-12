import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const RegistrationForm = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const router = useNavigate();
  const { id } = useParams();
  const isViewMode = Boolean(id);
  const location = useLocation();
  const [formData, setFormData] = useState({
    providerName: "",
    category: "",
    subCategory: "",
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
  const [categories, setCategories] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/category/getAllActiveCategories",
        );
        setCategories(res.data.data || []);
      } catch (error) {
        console.error("Category fetch failed", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (
      location.pathname === "/register" &&
      !sessionStorage.getItem("registerReloaded")
    ) {
      sessionStorage.setItem("registerReloaded", "true");
      window.location.reload();
    }
  }, [location.pathname]);

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
    if (isViewMode) return;

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

      toast.success("Provider registered successfully ✅");

      router("/home");

      console.log(res.data);
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Validation error");
    }
  };

  useEffect(() => {
    const fetchProviderDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/serviceProvider/getProviderById/${id}`,
        );
        setFormData(res.data.data);
      } catch (error) {
        toast.error("Failed to load provider details");
        console.error(error);
      }
    };

    if (isViewMode) {
      fetchProviderDetails();
    }
  }, [id, isViewMode]);

  return (
    <div className="min-h-screen px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-800">
            {isViewMode
              ? "View Service Provider"
              : "Service Provider Registration"}
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
                disabled={isViewMode}
                value={formData.providerName}
                onChange={handleChange}
              />

              {/* CATEGORY + SUB CATEGORY */}
              <div className="relative">
                <label className="label">Category</label>

                <button
                  type="button"
                  disabled={isViewMode}
                  onClick={() => setOpenDropdown(!openDropdown)}
                  className={`input-soft w-full text-left flex justify-between items-center ${
                    isViewMode ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                >
                  {formData.subCategory ||
                    formData.category ||
                    "Select Category"}
                  <span>▾</span>
                </button>

                {openDropdown && !isViewMode && (
                  <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-lg border">
                    {categories.map((cat) => (
                      <div key={cat._id} className="group relative">
                        {/* CATEGORY */}
                        <div
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              category: cat.category,
                              subCategory: "",
                            }));
                            setOpenDropdown(false);
                          }}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-medium"
                        >
                          {cat.category}
                        </div>

                        {/* SUB CATEGORIES (LEFT SIDE) */}
                        {cat.subCategories?.length > 0 && (
                          <div className="absolute right-full top-0 hidden group-hover:block bg-white w-56 border shadow-lg rounded-xl">
                            {cat.subCategories.map((sub) => (
                              <div
                                key={sub._id}
                                onClick={() => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    category: cat.category,
                                    subCategory: sub.name,
                                  }));
                                  setOpenDropdown(false);
                                }}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              >
                                {sub.name}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Input
              label="Short Description"
              name="shortDescription"
              disabled={isViewMode}
              value={formData.shortDescription}
              onChange={handleChange}
            />

            <Textarea
              label="Full Description"
              name="fullDescription"
              disabled={isViewMode}
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
                disabled={isViewMode}
                minLength={10}
                maxLength={10}
                onChange={handleChange}
              />
              <Input
                label="Email"
                name="email"
                value={formData.email}
                disabled={isViewMode}
                onChange={handleChange}
              />
              <Input
                label="Website"
                name="website"
                value={formData.website}
                disabled={isViewMode}
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
              disabled={isViewMode}
              onChange={handleChange}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="City"
                name="city"
                value={formData.city}
                disabled={isViewMode}
                onChange={handleChange}
              />
              <Input
                label="State"
                name="state"
                value={formData.state}
                disabled={isViewMode}
                onChange={handleChange}
              />
              <Input
                label="Pincode"
                name="pincode"
                type="Number"
                value={formData.pincode}
                disabled={isViewMode}
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
                  disabled={isViewMode}
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
                disabled={isViewMode}
                onChange={handleChange}
              />
              <Input
                label="Closing Time"
                type="time"
                name="closingTime"
                value={formData.closingTime}
                disabled={isViewMode}
                onChange={handleChange}
              />
            </div>
          </Section>

          {/* ACTIONS */}
          {!isViewMode && (
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
          )}
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

const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  disabled,
  minLength,
  maxLength,
}) => (
  <div>
    <label className="label">{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      disabled={disabled}
      minLength={minLength}
      maxLength={maxLength}
      className={`input-soft ${
        disabled ? "bg-gray-100 cursor-not-allowed" : ""
      }`}
    />
  </div>
);

const Textarea = ({ label, name, value, onChange, disabled }) => (
  <div>
    <label className="label">{label}</label>
    <textarea
      rows="4"
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`input-soft resize-none ${
        disabled ? "bg-gray-100 cursor-not-allowed" : ""
      }`}
    />
  </div>
);

const Select = ({
  label,
  name,
  value,
  onChange,
  options,
  disabled = false,
}) => (
  <div>
    <label className="label">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`input-soft ${
        disabled ? "bg-gray-100 cursor-not-allowed" : ""
      }`}
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
