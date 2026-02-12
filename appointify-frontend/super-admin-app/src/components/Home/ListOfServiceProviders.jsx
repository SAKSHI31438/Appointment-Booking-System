import React, { useEffect, useState } from "react";
import axios from "axios";
import { Eye, PencilLine } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ListOfServiceProviders = () => {
  const [providers, setProviders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [openStatusDropdown, setOpenStatusDropdown] = useState(false);

  const navigate = useNavigate();

  /* ================= PROVIDERS ================= */
  const fetchProviders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/serviceProvider/getAllProviders",
      );
      setProviders(res.data.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch service providers");
    } finally {
      setLoading(false);
    }
  };

  /* ================= CATEGORIES ================= */
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

  useEffect(() => {
    fetchProviders();
    fetchCategories();
  }, []);

  /* ================= FILTER ================= */
  const filteredProviders = providers.filter((p) => {
    const matchSearch =
      p.providerName?.toLowerCase().includes(search.toLowerCase()) ||
      p.city?.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      selectedCategory === "All" ||
      p.category === selectedCategory ||
      p.subCategory === selectedSubCategory;

    const matchStatus = statusFilter === "All" || p.status === statusFilter;

    return matchSearch && matchCategory && matchStatus;
  });

  const toggleStatus = async (id) => {
    try {
      await axios.put(
        `http://localhost:3000/api/serviceProvider/toggle-status/${id}`,
      );

      setProviders((prev) =>
        prev.map((p) =>
          p._id === id
            ? { ...p, status: p.status === "active" ? "inactive" : "active" }
            : p,
        ),
      );
    } catch (error) {
      console.log(error);
      toast.error("Status update failed");
    }
  };

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

        {/* CUSTOM CATEGORY DROPDOWN */}
        <div className="relative md:w-68">
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="input-soft w-full text-left flex justify-between items-center"
          >
            {selectedSubCategory || selectedCategory || "Select Category"}
            <span>▾</span>
          </button>

          {openDropdown && (
            <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-lg border">
              {/* ALL */}
              <div
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedSubCategory("");
                  setOpenDropdown(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                All
              </div>

              {categories.map((cat) => (
                <div key={cat._id} className="group relative">
                  {/* Category */}
                  <div
                    onClick={() => {
                      setSelectedCategory(cat.category);
                      setSelectedSubCategory("");
                      setOpenDropdown(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-medium"
                  >
                    {cat.category}
                  </div>

                  {/* Sub Categories */}
                  {cat.subCategories?.length > 0 && (
                    <div className="absolute right-full top-0 hidden group-hover:block bg-white w-52 border shadow-lg rounded-xl">
                      {cat.subCategories.map((sub) => (
                        <div
                          key={sub._id}
                          onClick={() => {
                            setSelectedCategory(cat.category);
                            setSelectedSubCategory(sub.name);
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

        <div className="relative md:w-60">
          <button
            onClick={() => setOpenStatusDropdown(!openStatusDropdown)}
            className="input-soft w-full text-left flex justify-between items-center"
          >
            {statusFilter || "Select Status"}
            <span>▾</span>
          </button>

          {openStatusDropdown && (
            <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-lg border">
              <div
                onClick={() => {
                  setStatusFilter("All");
                  setOpenStatusDropdown(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                All
              </div>

              <div
                onClick={() => {
                  setStatusFilter("active");
                  setOpenStatusDropdown(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                active
              </div>

              <div
                onClick={() => {
                  setStatusFilter("inactive");
                  setOpenStatusDropdown(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                inactive
              </div>
            </div>
          )}
        </div>
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
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : filteredProviders.length > 0 ? (
              filteredProviders.map((p) => (
                <tr key={p._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{p.providerName}</td>
                  <td className="px-6 py-4">
                    {p.category}
                    {p.subCategory && (
                      <span className="text-xs text-gray-400">
                        {" "}
                        ({p.subCategory})
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">{p.phoneNumber}</td>
                  <td className="px-6 py-4">{p.city}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <StatusBadge status={p.status} />

                      <button
                        onClick={() => toggleStatus(p._id)}
                        className={`relative w-12 h-6 rounded-full transition duration-300 
    ${p.status === "active" ? "bg-green-500" : "bg-gray-300"}`}
                      >
                        <span
                          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md 
      transform transition duration-300 
      ${p.status === "active" ? "translate-x-6" : ""}`}
                        />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-4">
                      <div className="rounded-full bg-yellow-100 p-1.5 cursor-pointer hover:bg-yellow-200 transition">
                        <PencilLine
                          onClick={() => navigate(`/providers/edit/${p._id}`)}
                          className="w-4 h-4 cursor-pointer "
                        />
                      </div>
                      <div className="rounded-full bg-red-100 p-1.5 cursor-pointer hover:bg-red-200 transition">
                        <Eye
                          onClick={() => navigate(`/providers/view/${p._id}`)}
                          className="w-4 h-4 cursor-pointer"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
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
    className={`px-3 py-1 rounded-full text-xs font-medium ${
      status === "active"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {status === "active" ? "Active" : "Inactive"}
  </span>
);

export default ListOfServiceProviders;
