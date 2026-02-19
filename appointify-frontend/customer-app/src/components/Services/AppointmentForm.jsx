import React from "react";
import { useNavigate } from "react-router-dom";

const AppointmentForm = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl w-full mx-auto">
      {/* HEADER */}
      <div className="bg-[#540863] text-white px-7 py-5">
        <h2 className="text-xl font-semibold">Book Appointment</h2>
        <p className="text-sm opacity-90">
          Fill in your details to confirm booking
        </p>
      </div>

      <form className="p-8 space-y-10 max-h-[85vh]">
        {/* CUSTOMER INFO */}
        <section>
          <h3 className="section-title">Customer Information</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <Input label="Full Name" type="text" />

            <div className="flex gap-4">
              <Input label="Age" type="number" />
              <Select label="Gender" options={["Male", "Female", "Other"]} />
            </div>

            <Input label="Phone Number" type="tel" />
            <Input label="Email Address" type="email" />

            <Input label="City" type="text" full />
          </div>
        </section>

        {/* SERVICE DETAILS */}
        <section>
          <h3 className="section-title">Service Details</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <Input label="Service Provider" readOnly />
            <Input label="Category" readOnly />
            <Input label="Service Type" full readOnly />
          </div>
        </section>

        {/* APPOINTMENT INFO */}
        <section>
          <h3 className="section-title">Appointment Information</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <Input label="Date" type="date" />
            <Input label="Time" type="time" />
          </div>
        </section>

        {/* NOTES */}
        <section>
          <h3 className="section-title">Additional Notes</h3>

          <textarea
            rows="4"
            placeholder="Write any important information..."
            className="input-style resize-none"
          />
        </section>

        {/* BUTTONS */}
        <div className="flex justify-end gap-4 pt-6 border-t mb-10 pb-10">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
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

/* ---------- INPUT COMPONENTS ---------- */

const Input = ({ label, type = "text", readOnly, full }) => (
  <div className={full ? "md:col-span-2" : ""}>
    <label className="label">{label}</label>
    <input
      type={type}
      readOnly={readOnly}
      className={`input-style ${readOnly ? "bg-gray-50" : ""}`}
    />
  </div>
);

const Select = ({ label, options }) => (
  <div>
    <label className="label">{label}</label>
    <select className="input-style">
      <option>Select</option>
      {options.map((opt) => (
        <option key={opt}>{opt}</option>
      ))}
    </select>
  </div>
);
