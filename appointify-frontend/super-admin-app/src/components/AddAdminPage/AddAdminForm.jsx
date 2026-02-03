import React, { useEffect, useState } from "react";
import axios from "axios";
import SuperAdminSideBar from "../Sidebar/SuperAdminSideBar";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const AddAdminForm = () => {
  const [providers, setProviders] = useState([]);
  const router = useNavigate();
  const { id } = useParams();
  const isViewMode = Boolean(id);
  const location = useLocation();
  const [formData, setFormData] = useState({
    fullName: "",
    provider: "",
    dob: "",
    contactNumber: "",
    email: "",
    role: "ADMIN",
    address: "",
    aadharNumber: "",
  });

  useEffect(() => {
    if (
      location.pathname === "/register" &&
      !sessionStorage.getItem("registerReloaded")
    ) {
      sessionStorage.setItem("registerReloaded", "true");
      window.location.reload();
    }
  }, [location.pathname]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isViewMode) return;

    console.log(formData);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/serviceProviderAdmin/createAdmin",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("FORM DATA ", formData);
      alert("Admin Added successfully ✅");

      router("/admin");

      console.log(res.data);
    } catch (error) {
      console.error(error);

      alert(error.response.data.message || "Validation error");
    }
  };

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/serviceProvider/getAllProviders",
        );
        console.log("PROVIDERS FROM API ", res.data.data);
        setProviders(res.data.data || []);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch service providers");
        setProviders([]);
      }
    };

    fetchProviders();
  }, []);

  useEffect(() => {
    const fetchProviderDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/serviceProviderAdmin/getAdminById/${id}`,
        );
        const data = res.data.data;

        setFormData({
          ...data,
          dob: data.dob ? data.dob.split("T")[0] : "",
          role: data.role ? data.role.toUpperCase() : "ADMIN",
        });
      } catch (error) {
        alert("Failed to load admin details");
        console.error(error);
      }
    };

    if (isViewMode) {
      fetchProviderDetails();
    }
  }, [id, isViewMode]);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <SuperAdminSideBar />

      <div className="flex-1 md:ml-64 py-8">
        <div className="max-w-6xl mx-auto ">
          {/* Header */}
          <div className="px-8 py-6 border-b">
            <h1 className="text-2xl font-semibold text-gray-800">
              {isViewMode ? "View Admin" : "Add New Admin"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Create admin for a service provider
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-10 space-y-10">
            {/* BASIC INFO */}
            <Section title="Basic Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  name="fullName"
                  disabled={isViewMode}
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {providers.length > 0 && (
                  <Select
                    label="Select Provider"
                    name="provider"
                    value={formData.provider}
                    onChange={handleChange}
                    labels="Select Provider"
                    disabled={isViewMode}
                    options={providers.map((p) => ({
                      id: p._id,
                      name: p.providerName,
                    }))}
                  />
                )}

                <Input
                  label="Date of Birth"
                  type="date"
                  name="dob"
                  value={formData.dob}
                  disabled={isViewMode}
                  onChange={handleChange}
                />
                <Input
                  label="Role"
                  name="role"
                  value={formData.role}
                  disabled
                />
              </div>
            </Section>

            {/* CONTACT */}
            <Section title="Contact Details">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Email Address"
                  name="email"
                  disabled={isViewMode}
                  value={formData.email}
                  onChange={handleChange}
                />

                <Input
                  label="Contact Number"
                  maxLength="10"
                  name="contactNumber"
                  disabled={isViewMode}
                  minLength="10"
                  value={formData.contactNumber}
                  onChange={handleChange}
                />
              </div>
            </Section>

            {/* ADDRESS */}
            <Section title="Address & Identity">
              <Textarea
                label="Address"
                name="address"
                disabled={isViewMode}
                value={formData.address}
                onChange={handleChange}
              />

              <Input
                label="Aadhaar Number"
                maxLength="12"
                minLength="12"
                name="aadharNumber"
                disabled={isViewMode}
                value={formData.aadharNumber}
                onChange={handleChange}
              />
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
                  Add Admin
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

/* ---------- UI COMPONENTS (SAME AS YOUR FORM) ---------- */

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
  maxLength,
  minLength,
  disabled = false,
}) => (
  <div>
    <label className="label">{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      disabled={disabled}
      maxLength={maxLength}
      minLength={minLength}
      className={`input-soft ${disabled && "bg-gray-100 cursor-not-allowed"}`}
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
      disabled={disabled}
      onChange={onChange}
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
        <option key={opt.id} value={opt.id}>
          {opt.name}
        </option>
      ))}
    </select>
  </div>
);

export default AddAdminForm;
