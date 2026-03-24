import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../Sidebar/SideBar";
import {
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Globe,
  CalendarDays,
  Clock,
} from "lucide-react";

const Profile = () => {
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH PROVIDER PROFILE ---------------- */

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/serviceProvider/ProviderProfile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setProvider(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProvider();
  }, []);

  if (loading) {
    return (
      <div className="ml-[50%] mt-50 p-10 text-gray-500 flex justify-center mx-auto">
        Loading profile...
      </div>
    );
  }

  return (
    <>
      <SideBar />

      <main className="ml-0 md:ml-64 p-6 md:p-10 bg-gray-50 min-h-screen w-full">
        {/* Page Title */}

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Provider Profile</h1>
          <p className="text-gray-500 text-sm">
            Manage your service provider information
          </p>
        </div>

        {/* PROFILE CARD */}

        <div className="bg-white rounded-2xl shadow-md p-8 w-full">
          {/* Header */}

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-6">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-[#540863]">
                  {provider?.providerName}
                </h2>

                {provider?.status === "active" && (
                  <CheckCircle className="text-green-500" size={20} />
                )}
              </div>

              <p className="text-gray-600 mt-1">
                {provider?.category} • {provider?.subCategory?.join(", ")}
              </p>
            </div>

            <span
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                provider?.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {provider?.status}
            </span>
          </div>

          {/* DESCRIPTION */}

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              About Service
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              {provider?.fullDescription || provider?.shortDescription}
            </p>
          </div>

          {/* CONTACT INFO */}

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <InfoItem
              icon={<Phone size={18} />}
              label="Phone"
              value={provider?.phoneNumber}
            />

            <InfoItem
              icon={<Mail size={18} />}
              label="Email"
              value={provider?.email}
            />

            {provider?.website && (
              <InfoItem
                icon={<Globe size={18} />}
                label="Website"
                value={provider?.website}
              />
            )}
          </div>

          {/* ADDRESS */}

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Location
            </h3>

            <div className="flex items-start gap-2 text-gray-600 text-sm">
              <MapPin size={18} />

              <span>
                {provider?.address}, {provider?.city}, {provider?.state} -{" "}
                {provider?.pincode}
              </span>
            </div>
          </div>

          {/* WORKING HOURS */}

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <InfoItem
              icon={<CalendarDays size={18} />}
              label="Working Days"
              value={
                provider?.workingDays?.length
                  ? `${provider.workingDays[0]} - ${
                      provider.workingDays[provider.workingDays.length - 1]
                    }`
                  : "Not specified"
              }
            />

            <InfoItem
              icon={<Clock size={18} />}
              label="Working Hours"
              value={`${provider?.openingTime} - ${provider?.closingTime}`}
            />
          </div>
        </div>
      </main>
    </>
  );
};

/* ---------------- INFO ITEM ---------------- */

const InfoItem = ({ icon, label, value }) => {
  return (
    <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
      <div className="text-[#540863]">{icon}</div>

      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-700">{value}</p>
      </div>
    </div>
  );
};

export default Profile;
