import React from "react";

const HeroSection = () => {
  return (
    <section className="min-h-screen w-full relative flex items-center overflow-hidden">
      <img
        src="/src/assets/images/Body/hero.avif"
        alt="Hero Background"
        className="absolute inset-0 w-full h-screen object-cover"
      />
      <div className="relative w-full max-w-7xl mx-auto flex items-center  px-4">
        {/* LEFT CONTENT */}

        <div className="flex flex-col justify-center ">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Book Your
          </h1>

          <h2 className="text-5xl md:text-6xl font-extrabold text-[#540863] mt-2">
            Appointment
          </h2>

          <p className="mt-4 text-xl md:text-2xl font-medium italic text-gray-800">
            Anytime. Anywhere. Hassle-Free.
          </p>

          <p className="mt-6 text-white leading-relaxed max-w-xl">
            Easily book appointments with hospitals, clinics, salons, and
            diagnostic centers near you. Choose your preferred time slot, avoid
            long waiting queues, and manage all your bookings in one place.
          </p>

          <div className="flex gap-4 mt-8">
            <button className="px-8 py-3 bg-[#540863] text-white font-semibold rounded-lg shadow hover:bg-[#390644] transition">
              Book Now
            </button>

            <button className="px-8 py-3 border border-[#540863] text-[#540863] font-semibold rounded-lg hover:bg-[#390644] hover:text-white transition">
              Learn More
            </button>
          </div>
        </div>

        {/* <div className="flex justify-center items-center">
          <img
            src="/src/assets/images/Body/appointment-booking-with-calendar.png"
            alt="Appointment Booking"
            className="w-full max-w-lg object-contain"
          />
        </div> */}
      </div>
    </section>
  );
};

export default HeroSection;
