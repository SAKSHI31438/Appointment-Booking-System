import React from "react";
import Navbar from "../Navbar/Navbar";
import {
  Users,
  Briefcase,
  Target,
  Eye,
  ShieldCheck,
  CalendarCheck,
  Clock,
  ChevronRight,
} from "lucide-react";
import Footer from "../Footer/Footer";

const Feature = ({ icon: Icon, title, children }) => (
  <div className="bg-white/70 backdrop-blur-sm border border-rose-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start gap-4">
      <div className="bg-rose-50 text-[#540863] rounded-lg p-3 flex items-center justify-center">
        <Icon size={20} />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-600 text-sm">{children}</p>
      </div>
    </div>
  </div>
);

const AboutUsPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#FFD3D5] py-12 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
                About Us
              </h1>
              <p className="text-lg text-gray-600 mb-6 max-w-xl">
                We connect skilled service providers with customers through a
                simple, secure, and dependable booking platform. Our focus is on
                making appointments effortless so everyone can spend time on
                what matters most.
              </p>

              <div className="flex flex-wrap gap-3 items-center">
                <button className="inline-flex items-center gap-2 bg-[#540863] hover:bg-[#390644] text-white font-semibold py-3 px-5 rounded-lg shadow-md transition duration-300">
                  Get Started
                  <ChevronRight size={16} />
                </button>

                <a
                  href="#contact"
                  className="text-[#540863] hover:underline flex items-center gap-2 text-sm"
                >
                  Contact
                  <ChevronRight size={14} />
                </a>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Feature icon={Users} title="Trusted Network">
                  Verified providers and transparent reviews — find the right
                  match with confidence.
                </Feature>

                <Feature icon={CalendarCheck} title="Real-time Booking">
                  Instant appointments with synchronized availability and easy
                  management.
                </Feature>
              </div>
            </div>

            {/* Illustration / Image */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md bg-linear-to-br from-rose-50 to-white rounded-2xl p-6 shadow-lg border border-rose-100">
                {/* Simple inline illustration */}
                <svg
                  viewBox="0 0 600 400"
                  className="w-full h-64"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="g1" x1="0" x2="1">
                      <stop offset="0%" stopColor="#fff1f2" />
                      <stop offset="100%" stopColor="#fff" />
                    </linearGradient>
                  </defs>
                  <rect
                    x="0"
                    y="0"
                    width="600"
                    height="400"
                    rx="24"
                    fill="url(#g1)"
                  />
                  <g transform="translate(40,40)">
                    <rect
                      x="0"
                      y="30"
                      width="340"
                      height="220"
                      rx="12"
                      fill="#fff"
                      stroke="#ffe4e6"
                    />
                    <circle
                      cx="50"
                      cy="70"
                      r="28"
                      fill="#fff0f2"
                      stroke="#fecdd3"
                    />
                    <path d="M110 60 h120 v8 h-120 z" fill="#ffe4e6" />
                    <path d="M110 82 h100 v8 h-100 z" fill="#fff2f4" />
                    <rect
                      x="18"
                      y="150"
                      width="120"
                      height="12"
                      rx="6"
                      fill="#ffe4e6"
                    />
                    <g transform="translate(320,20)">
                      <circle
                        cx="40"
                        cy="40"
                        r="40"
                        fill="#fff"
                        stroke="#fecdd3"
                      />
                      <path
                        d="M15 60 q25 -30 50 0"
                        stroke="#f43f5e"
                        fill="none"
                        strokeWidth="4"
                      />
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* Core Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Feature icon={Users} title="Who We Are">
              A dedicated team focused on building trustworthy connections
              between providers and customers for seamless service access.
            </Feature>

            <Feature icon={Briefcase} title="What We Do">
              We make scheduling, managing and fulfilling service bookings
              straightforward and scalable for both businesses and customers.
            </Feature>

            <Feature icon={Target} title="Our Mission">
              Empower communities with a transparent, user-first platform that
              unlocks economic opportunity.
            </Feature>

            <Feature icon={Eye} title="Our Vision">
              A future where booking services is fast, fair and integrated into
              everyday life.
            </Feature>
          </div>

          {/* Why Choose Section */}
          <div className="bg-white/70 backdrop-blur-sm border border-rose-100 rounded-2xl p-6 shadow-sm mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Why Choose Our Platform
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <div className="bg-rose-50 text-[#540863] rounded-lg p-3">
                  <CalendarCheck size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    Seamless Booking
                  </h4>
                  <p className="text-sm text-gray-600">
                    Real-time availability and easy scheduling.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-rose-50 text-[#540863] rounded-lg p-3">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    Secure & Reliable
                  </h4>
                  <p className="text-sm text-gray-600">
                    Data-first security and trusted providers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-rose-50 text-[#540863] rounded-lg p-3">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    24/7 Support
                  </h4>
                  <p className="text-sm text-gray-600">
                    Assistance is available whenever you need it.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-rose-50 text-[#540863] rounded-lg p-3">
                  <Users size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    Trusted Network
                  </h4>
                  <p className="text-sm text-gray-600">
                    Verified professionals you can rely on.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-rose-50 text-[#540863] rounded-lg p-3">
                  <Briefcase size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    Business Growth
                  </h4>
                  <p className="text-sm text-gray-600">
                    Tools to manage schedules and scale services.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-rose-50 text-[#540863] rounded-lg p-3">
                  <Target size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    Built for Results
                  </h4>
                  <p className="text-sm text-gray-600">
                    Designed to increase bookings and satisfaction.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <button className="inline-flex items-center gap-3 bg-[#540863] hover:bg-[#390644] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300">
              Get Started Today
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUsPage;
