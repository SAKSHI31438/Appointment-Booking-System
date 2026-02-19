import React, { useEffect, useState } from "react";
import { Eye, PencilLine, Plus, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ListOfCategory = () => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /* ---------- API CALL ---------- */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/category/getAllCategories",
        );
        setCategories(res.data.data || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  /* ---------- SEARCH FILTER ---------- */
  const filteredCategories = categories.filter((cat) => {
    const categoryMatch = cat.category
      .toLowerCase()
      .includes(search.toLowerCase());

    const subMatch = cat.subCategories?.some((sub) =>
      sub.name.toLowerCase().includes(search.toLowerCase()),
    );

    return categoryMatch || subMatch;
  });

  const toggleStatus = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/category/toggle-status/${id}`);

      setCategories((prev) =>
        prev.map((cat) =>
          cat._id === id
            ? {
                ...cat,
                status: cat.status === "active" ? "inactive" : "active",
              }
            : cat,
        ),
      );
    } catch (error) {
      console.log(error);
      toast.error("Status update failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Categories</h1>
          <p className="text-sm text-gray-500">
            List of all categories with sub-categories
          </p>
        </div>

        <Link
          to="/add-category"
          className="inline-flex items-center gap-2 px-4 py-3 bg-[#540863] text-white rounded-lg shadow hover:bg-[#390644]"
        >
          <Plus size={18} />
          Add Category
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute top-3.5 left-4 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search category or sub-category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#540863]"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white border rounded-2xl shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="text-left px-6 py-4 font-semibold">Category</th>
              <th className="text-left px-6 py-4 font-semibold">
                Sub Categories
              </th>
              <th className="text-center px-6 py-4 font-semibold">Count</th>
              <th className="text-center px-6 py-4 font-semibold">Status</th>
              <th className="text-center px-6 py-4 font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="text-center py-10 text-gray-400">
                  Loading categories...
                </td>
              </tr>
            ) : filteredCategories.length > 0 ? (
              filteredCategories.map((cat) => (
                <tr key={cat._id} className="border-t hover:bg-gray-50">
                  {/* Category */}
                  <td className="px-6 py-4 font-medium text-[#540863]">
                    {cat.category}
                  </td>

                  {/* Sub Categories */}
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {cat.subCategories?.length > 0 ? (
                        cat.subCategories.map((sub, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700"
                          >
                            {sub.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 text-sm">
                          No sub-categories
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Count */}
                  <td className="px-6 py-4 text-center font-semibold">
                    {cat.subCategories?.length || 0}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <StatusBadge status={cat.status} />

                      <button
                        onClick={() => toggleStatus(cat._id)}
                        className={`relative w-12 h-6 rounded-full transition duration-300 
    ${cat.status === "active" ? "bg-green-500" : "bg-gray-300"}`}
                      >
                        <span
                          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md 
      transform transition duration-300 
      ${cat.status === "active" ? "translate-x-6" : ""}`}
                        />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-4">
                      <div className="rounded-full bg-yellow-100 p-1.5 cursor-pointer hover:bg-yellow-200 transition">
                        <PencilLine
                          onClick={() =>
                            navigate(`/categories/edit/${cat._id}`)
                          }
                          className="w-4 h-4 cursor-pointer "
                        />
                      </div>
                      <div className="rounded-full bg-red-100 p-1.5 cursor-pointer hover:bg-red-200 transition">
                        <Eye
                          onClick={() =>
                            navigate(`/categories/view/${cat._id}`)
                          }
                          className="w-4 h-4 cursor-pointer"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-10 text-gray-500">
                  No categories found
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

export default ListOfCategory;
