import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { X } from "lucide-react";
import AppointmentForm from "./AppointmentForm";

const DetailsSection = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/serviceProvider/getProviderById/${id}`,
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

  if (loading)
    return (
      <p className="text-center py-16 text-gray-500 mt-30 mb-50">
        Loading provider details...
      </p>
    );

  if (!provider)
    return (
      <p className="text-center py-16 text-gray-500">Provider not found.</p>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 mt-16">
      {/* Header */}
      <div className="border-b pb-6 mb-8">
        <h1 className="text-4xl font-bold text-[#540863]">
          {provider.providerName}
        </h1>
        <p className="text-gray-500 mt-2">
          {provider.category} • {provider.subCategory}
        </p>
      </div>

      {/* Description */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">About Service</h2>
        <p className="text-gray-700 leading-relaxed">
          {provider.fullDescription || provider.shortDescription}
        </p>
      </section>

      {/* Contact + Address */}
      <div className="grid md:grid-cols-2 gap-10 mb-10">
        <section>
          <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
          <p>📞 {provider.phoneNumber}</p>
          <p>✉ {provider.email}</p>
          {provider.website && (
            <a
              href={provider.website}
              target="_blank"
              rel="noreferrer"
              className="text-[#540863]"
            >
              Visit Website
            </a>
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Address</h2>
          <p>{provider.address}</p>
          <p>
            {provider.city}, {provider.state} - {provider.pincode}
          </p>
        </section>
      </div>

      {/* Working Hours */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-3">Working Hours</h2>
        <p>{provider.workingDays?.join(", ")}</p>
        <p>
          {provider.openingTime} — {provider.closingTime}
        </p>
      </section>

      {/* CTA */}
      <button
        onClick={() => setFormVisible(true)}
        className="bg-[#540863] text-white px-8 cursor-pointer py-3 rounded-lg hover:bg-[#390644] transition"
      >
        Book Appointment
      </button>

      {formVisible && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm 
    flex items-center justify-center z-1000 "
          onClick={() => setFormVisible(false)}
        >
          <div
            className="bg-white rounded-xl w-[90%] md:w-[60%] 
      max-h-[90vh] overflow-y-auto shadow-2xl relative  mb-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setFormVisible(false)}
              className="absolute top-3 right-3 p-1 rounded-full 
        bg-[#540863] text-white hover:bg-[#390644] transition"
            >
              <X className="h-5 w-5" />
            </button>

            <AppointmentForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsSection;
