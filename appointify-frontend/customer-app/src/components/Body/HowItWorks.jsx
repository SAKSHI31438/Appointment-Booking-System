import React from "react";

const HowItWorks = () => {
  return (
    <section className="py-20 ">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            How It Works
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Book appointments quickly and easily by following these simple
            steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-rose-100 text-[#540863] text-2xl font-bold">
              1
            </div>
            <h3 className="text-lg font-semibold mb-2">Search a Service</h3>
            <p className="text-gray-600 text-sm">
              Find hospitals, salons, clinics, or labs near your location.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-rose-100 text-[#540863] text-2xl font-bold">
              2
            </div>
            <h3 className="text-lg font-semibold mb-2">Choose Time Slot</h3>
            <p className="text-gray-600 text-sm">
              Check real-time availability and select a suitable date & time.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-rose-100 text-[#540863] text-2xl font-bold">
              3
            </div>
            <h3 className="text-lg font-semibold mb-2">Book Instantly</h3>
            <p className="text-gray-600 text-sm">
              Confirm your appointment with a fast and secure booking process.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-rose-100 text-[#540863] text-2xl font-bold">
              4
            </div>
            <h3 className="text-lg font-semibold mb-2">Visit & Relax</h3>
            <p className="text-gray-600 text-sm">
              Visit on time and enjoy a smooth, hassle-free experience.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-[#540863] text-white font-semibold rounded-lg hover:bg-[#390644] transition">
            Book Appointment Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
