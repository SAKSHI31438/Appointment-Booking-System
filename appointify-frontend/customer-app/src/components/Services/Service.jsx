import React, { useState } from "react";
import { categories } from "../../utils/categoriesData";
import { providerData } from "../../utils/providerData";
import { MapPin, Star, CheckCircle } from "lucide-react";

const Service = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredProviders = providerData.filter((provider) => {
    const matchesSearch = provider.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = selectedCategory
      ? provider.subCategory === selectedCategory
      : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 mt-16">
      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by provider name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#540863]"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-1/3 px-4 py-3 border rounded-lg"
        >
          <option value="">All Categories</option>
          {categories.map((cat) =>
            cat.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))
          )}
        </select>
      </div>

      {/* Provider List */}
      <div className="divide-y bg-[#FFD3D5] rounded-xl ">
        {filteredProviders.map((provider) => (
          <div
            key={provider.id}
            className="flex flex-col md:flex-row gap-6 p-6 items-start md:items-center"
          >
            {/* Image */}
            <img
              src={provider.image}
              alt={provider.name}
              className="w-full md:w-40 h-32 object-cover rounded-lg"
            />

            {/* Provider Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold text-black">
                  {provider.name}
                </h3>
                {provider.isVerified && (
                  <>
                    <CheckCircle className="text-green-500" size={18} />
                    <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
                      Verified
                    </span>
                  </>
                )}
              </div>

              <p className="text-sm text-black mt-1">
                {provider.subCategory} • {provider.experience}
              </p>

              <p className="text-sm text-black mt-2">{provider.description}</p>

              <div className="flex items-center gap-2 text-sm text-black mt-3">
                <MapPin size={14} />
                <span>{provider.city}</span>
              </div>

              <p className="text-sm text-black mt-2">
                Next Available:{" "}
                <span className="font-medium text-green-600">
                  {provider.nextAvailableSlot}
                </span>
              </p>
            </div>

            {/* Right Section */}
            <div className="w-full md:w-60 flex md:flex-col gap-4 border rounded-xl p-4">
              <div>
                <div className="flex items-center gap-1 text-sm">
                  <Star size={16} className="text-yellow-500" />
                  <span className="font-medium">{provider.rating}</span>
                  <span className="text-gray-400">
                    ({provider.totalReviews} reviews)
                  </span>
                </div>

                <p className="text-sm text-black mt-2">
                  Consultation Fee:
                  <span className="font-semibold text-black ml-1">
                    {" "}
                    ₹{provider.consultationFee}
                  </span>
                </p>

                <p className="text-xs text-black mt-1">
                  ⏱ Responds within {provider.responseTime}
                </p>
              </div>

              <button className="bg-[#540863] text-white py-2 rounded-lg hover:bg-[#390644] transition">
                Book Appointment
              </button>

              <p className="text-[11px] text-center text-black">
                Free cancellation • No booking fee
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProviders.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No services found matching your search.
        </p>
      )}
    </div>
  );
};

export default Service;
