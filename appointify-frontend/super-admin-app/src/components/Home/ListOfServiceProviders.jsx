import React, { useEffect, useState } from "react";
import axios from "axios";

const ListOfServiceProviders = () => {
  const [providers, setProviders] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const categories = [
    "All",
    "Hospital",
    "Clinic",
    "Salon",
    "Restaurant",
    "Lab",
    "Gym",
  ];

  const fetchProviders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/serviceProvider/getAllProviders",
      );

      setProviders(res.data.data || []);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch service providers");
      setProviders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const filteredProviders = providers.filter((p) => {
    const matchSearch =
      p.providerName?.toLowerCase().includes(search.toLowerCase()) ||
      p.city?.toLowerCase().includes(search.toLowerCase());

    const matchCategory = category === "All" || p.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Service Providers
        </h1>
        <p className="text-sm text-gray-500">
          Manage all registered service providers
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-soft md:w-1/3"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input-soft md:w-52"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left">Provider Name</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Phone</th>
              <th className="px-6 py-4 text-left">City</th>
              <th className="px-6 py-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : filteredProviders.length > 0 ? (
              filteredProviders.map((p) => (
                <tr
                  key={p._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {p.providerName}
                  </td>
                  <td className="px-6 py-4">{p.category}</td>
                  <td className="px-6 py-4">{p.phoneNumber}</td>
                  <td className="px-6 py-4">{p.city}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status="Active" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No service providers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => (
  <span
    className={`px-3 py-1 rounded-full text-xs font-medium
      ${
        status === "Active"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
  >
    {status}
  </span>
);

export default ListOfServiceProviders;
