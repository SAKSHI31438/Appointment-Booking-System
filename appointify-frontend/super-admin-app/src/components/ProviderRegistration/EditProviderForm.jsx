import React, { useEffect, useState } from "react";
import SuperAdminSideBar from "../Sidebar/SuperAdminSideBar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditProviderForm = () => {
  const router = useNavigate();
  const { id } = useParams();

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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
    const fetchProvider = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/serviceProvider/getProviderById/${id}`,
        );

        setFormData(res.data.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load provider data");
      }
    };

    if (id) fetchProvider();
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/category/getAllActiveCategories",
        );
        setCategories(res.data.data || []);
      } catch (error) {
        console.error("Category fetch error", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleDay = (day) => {
    setFormData((prev) => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter((d) => d !== day)
        : [...prev.workingDays, day],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:3000/api/serviceProvider/editProvider/${id}`,
        formData,
      );

      toast.success("Provider updated successfully ✅");
      router("/home");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen w-full">
      <SuperAdminSideBar />

      <div className="w-full lg:not-only:ml-65">
        <div className="min-h-screen px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="px-8 py-6 border-b border-gray-200">
              <h1 className="text-2xl font-semibold text-gray-800">
                Edit Service Provider
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Edit and manage service providers
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

                  {/* CATEGORY DROPDOWN */}
                  <div className="relative">
                    <label className="label">Category</label>

                    <button
                      type="button"
                      onClick={() => setOpenDropdown(!openDropdown)}
                      className="input-soft w-full text-left flex justify-between"
                    >
                      {formData.subCategory ||
                        formData.category ||
                        "Select Category"}
                      <span>▾</span>
                    </button>

                    {openDropdown && (
                      <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow border">
                        {categories.map((cat) => (
                          <div key={cat._id} className="group relative">
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

                            {cat.subCategories?.length > 0 && (
                              <div className="absolute right-full top-0 hidden group-hover:block bg-white w-56 border shadow rounded-xl">
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
                  label="Address"
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
                      className={`px-4 py-2 rounded-xl text-sm font-medium
                      ${
                        formData.workingDays.includes(day)
                          ? "bg-[#540863] text-white"
                          : "bg-white border"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <Input
                    label="Opening Time"
                    name="openingTime"
                    type="time"
                    value={formData.openingTime}
                    onChange={handleChange}
                  />
                  <Input
                    label="Closing Time"
                    name="closingTime"
                    type="time"
                    value={formData.closingTime}
                    onChange={handleChange}
                  />
                </div>
              </Section>

              <div className="flex justify-end gap-4 pt-6 border-t">
                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-xl bg-[#540863] text-white shadow"
                >
                  Update Provider
                </button>
              </div>
            </form>
          </div>
        </div>
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

export default EditProviderForm;
