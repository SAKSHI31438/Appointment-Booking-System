import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, PencilLine, Trash2 } from "lucide-react";

const ListOfAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const categories = [
    "All",
    "Hospital",
    "Clinic",
    "Salon",
    "Restaurant",
    "Lab",
    "Gym",
  ];

  const fetchAdmins = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/serviceProviderAdmin/getAllAdmins",
      );
      console.log(res.data);
      setAdmins(res.data.data || []);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch service admins");
      setAdmins([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const filteredProviders = admins.filter((p) => {
    const matchSearch =
      p.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      p.provider.providerName?.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      category === "All" || p.provider.category === category;

    return matchSearch && matchCategory;
  });

  // const handleDelete = async (id) => {
  //   const confirmDelete = window.confirm(
  //     "Are you sure you want to delete this admin?",
  //   );

  //   if (!confirmDelete) return;

  //   try {
  //     await axios.delete(
  //       `http://localhost:3000/api/serviceProviderAdmin/removeAdmin/${id}`,
  //     );

  //     // UI se turant remove
  //     setAdmins((prev) => prev.filter((a) => a._id !== id));

  //     alert("Admin deleted successfully ✅");
  //   } catch (error) {
  //     console.error(error);
  //     alert("Failed to delete admin");
  //   }
  // };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Admin</h1>
          <p className="text-sm text-gray-500">
            Manage all registered service providers Admins
          </p>
        </div>
        <div>
          <Link
            to={"/add-admin"}
            className="px-8 py-3 bg-[#540863] text-white font-semibold rounded-lg shadow hover:bg-[#390644] transition"
          >
            Add Admin
          </Link>
        </div>
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
              <th className="px-6 py-4 text-left">Admin Name</th>
              <th className="px-6 py-4 text-left">Service Provider</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Phone</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Actions</th>
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
                    {p.fullName}
                  </td>
                  <td className="px-6 py-4">{p.provider.providerName}</td>
                  <td className="px-6 py-4">{p.provider.category}</td>
                  <td className="px-6 py-4">{p.contactNumber}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status="Active" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-4 ">
                      <div className="rounded-full bg-yellow-100 p-1.5 cursor-pointer hover:bg-yellow-200 transition">
                        <PencilLine className="w-4 h-4 " />
                      </div>
                      <div
                        onClick={() => navigate(`/admin/view/${p._id}`)}
                        className="rounded-full bg-red-100 p-1.5 cursor-pointer hover:bg-red-200 transition"
                      >
                        <Eye className="w-4 h-4 " />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No admins found
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

export default ListOfAdmin;
