import React from "react";

const hospitals = [
  {
    name: "Apollo Hospitals",
    specialty: "Best Cardiology Center",
    image:
      "https://drupal-cdn-hfaeddcdbng5hfbg.a01.azurefd.net/sites/default/files/2025-02/Apollo-Hospitals-Chennai%2C%20Nellore.jpg",
  },
  {
    name: "Fortis Hospitals",
    specialty: "Top Orthopedic Care",
    image:
      "https://drupal-cdn-hfaeddcdbng5hfbg.a01.azurefd.net/sites/default/files/2025-02/Apollo-Hospitals-Chennai%2C%20Nellore.jpg",
  },
  {
    name: "Narayana Health",
    specialty: "Leading Cancer Treatment",
    image:
      "https://drupal-cdn-hfaeddcdbng5hfbg.a01.azurefd.net/sites/default/files/2025-02/Apollo-Hospitals-Chennai%2C%20Nellore.jpg",
  },
];

const TopHospitals = () => {
  return (
    <section className="py-20 ">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Top Hospitals</h2>
          <p className="mt-2 text-gray-600">
            Trusted hospitals providing world-class healthcare services
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {hospitals.map((hospital, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300"
            >
              {/* Image */}
              <img
                src={hospital.image}
                alt={hospital.name}
                className="h-48 w-full object-cover"
              />

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800">
                  {hospital.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {hospital.specialty}
                </p>

                {/* CTA */}
                <button className="mt-4 text-sm font-medium text-rose-600 hover:underline">
                  Book Appointment →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopHospitals;
