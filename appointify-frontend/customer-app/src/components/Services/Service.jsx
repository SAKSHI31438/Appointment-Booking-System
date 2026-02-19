import React, { useEffect, useState } from "react";
import {
  MapPin,
  CheckCircle,
  Phone,
  Mail,
  CalendarDays,
  Clock,
} from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Service = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const filteredProviders = providers.filter((provider) => {
    const matchesSearch = provider.providerName
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      selectedCategory === "All" ||
      provider.category === selectedCategory ||
      provider.subCategory === selectedSubCategory;

    return matchesSearch && matchCategory;
  });

  useEffect(() => {
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

    const fetchProviders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/serviceProvider/getAllProviders",
        );
        setProviders(res.data.data || []);
      } catch (err) {
        console.log("Provider fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    fetchProviders();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 mt-16">
      {/* Search & Filter */}
      <div className="flex flex-col items-center w-full md:flex-row gap-4 mb-8">
        <div className="md:w-[70%] w-full">
          <input
            type="text"
            placeholder="Search by provider name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#540863] bg-white"
          />
        </div>

        <div className="relative md:w-[30%] w-full">
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="input-soft md:w-full w-full text-left flex justify-between items-center p-3 rounded-lg bg-white"
          >
            {selectedSubCategory || selectedCategory || "Select Category"}
            <span>▾</span>
          </button>

          {openDropdown && (
            <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-lg">
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

                  {cat.subCategories?.length > 0 && (
                    <div className="absolute right-full top-0 hidden group-hover:block bg-white w-52 shadow-lg rounded-xl">
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
      </div>

      {/* Provider List */}
      <div className="divide-y bg-[#FFD3D5] rounded-xl">
        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading services...</p>
        ) : filteredProviders.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            No services found matching your search.
          </p>
        ) : (
          filteredProviders.map((provider) => (
            <div
              key={provider._id}
              onClick={() => navigate(`/provider/${provider._id}`)}
              className="flex flex-col md:flex-row gap-6 p-6 items-start md:items-center cursor-pointer hover:bg-[#f9c5c6] transition"
            >
              {/* Provider Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-black">
                    {provider.providerName}
                  </h3>
                  <CheckCircle className="text-green-500" size={18} />
                </div>

                <p className="text-sm text-black mt-1">
                  {provider.category} • {provider.subCategory}
                </p>

                <p className="text-sm text-black mt-2">
                  {provider.shortDescription}
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-800 mt-3">
                  <MapPin size={14} />
                  <span>
                    {provider.city}, {provider.state}
                  </span>
                </div>

                <div className="md:flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-2 ">
                    <Phone size={14} className="text-gray-800 " />
                    <p className="text-sm text-gray-800">
                      {provider.phoneNumber} |
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ">
                    <Mail size={14} className="text-gray-800 mr-1" />{" "}
                    <p className="text-sm text-gray-800">{provider.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-1 ">
                  <div className="flex items-center gap-2 ">
                    <CalendarDays size={14} className="text-gray-800" />
                    <p className="text-xs text-gray-800">
                      {provider.workingDays?.[0]
                        ? `${provider.workingDays?.[0]} - ${provider.workingDays?.[provider.workingDays.length - 1]}`
                        : "NA"}{" "}
                      |
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ">
                    <Clock size={14} className="text-gray-800" />
                    <p className="text-xs text-gray-800">
                      {" "}
                      {provider.openingTime} - {provider.closingTime}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-60 flex flex-col gap-4 border rounded-xl p-4">
                <button className="bg-[#540863] text-white py-2 rounded-lg hover:bg-[#390644] transition">
                  Book Appointment
                </button>

                <Link
                  to={`/provider/${provider._id}`}
                  className="text-[11px] text-center text-black"
                >
                  View details for more info
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Service;
