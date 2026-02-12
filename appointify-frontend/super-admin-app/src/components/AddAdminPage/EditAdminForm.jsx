import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import SuperAdminSideBar from "../Sidebar/SuperAdminSideBar";
import { toast } from "react-toastify";

const EditAdminForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [providers, setProviders] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    provider: "",
    dob: "",
    role: "",
    email: "",
    contactNumber: "",
    address: "",
    aadharNumber: "",
  });

  /* ------------ GET ADMIN BY ID & PROVIDER LIST ------------ */

  useEffect(() => {
    const fetchAdmin = async () => {
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
      } catch (err) {
        console.error(err);
      }
    };

    const fetchProviders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/serviceProvider/getAllProviders",
        );
        setProviders(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    const loadData = async () => {
      if (id) await fetchAdmin();
      await fetchProviders();
    };
    loadData();
  }, [id]);

  /* ------------ INPUT CHANGE ------------ */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ------------ EDIT ADMIN ------------ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/api/serviceProviderAdmin/editAdmin/${id}`,
        formData,
      );
      toast.success("Admin Updated Successfully");
      navigate(-1);
    } catch (err) {
      console.error(err);
      toast.error("Update Failed");
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen w-full">
      <SuperAdminSideBar />

      <div className="flex-1 md:ml-64 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="px-8 py-6 border-b">
            <h1 className="text-2xl font-semibold text-gray-800">Edit Admin</h1>
            <p className="text-sm text-gray-500 mt-1">Update admin details</p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-10 space-y-10">
            {/* BASIC INFO */}
            <Section title="Basic Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />

                {providers.length > 0 && (
                  <Select
                    label="Select Provider"
                    name="provider"
                    value={formData.provider}
                    onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
                />

                <Input
                  label="Contact Number"
                  name="contactNumber"
                  maxLength="10"
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
                value={formData.address}
                onChange={handleChange}
              />

              <Input
                label="Aadhaar Number"
                name="aadharNumber"
                maxLength="12"
                minLength="12"
                value={formData.aadharNumber}
                onChange={handleChange}
              />
            </Section>

            {/* BUTTONS */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <button
                type="reset"
                className="px-6 py-2.5 rounded-xl bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-7 py-2.5 rounded-xl bg-[#540863] text-white"
              >
                Update Admin
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

/* ---------- UI COMPONENTS ---------- */

const Section = ({ title, children }) => (
  <section>
    <h2 className="text-lg font-semibold mb-6">{title}</h2>
    <div className="space-y-4">{children}</div>
  </section>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="label">{label}</label>
    <input {...props} className="input-soft" />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div>
    <label className="label">{label}</label>
    <textarea rows="4" {...props} className="input-soft resize-none" />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="label">{label}</label>
    <select {...props} className="input-soft">
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt.id} value={opt.id}>
          {opt.name}
        </option>
      ))}
    </select>
  </div>
);

export default EditAdminForm;
