import React from "react";
import { Mail, Phone, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#edb7bf] text-white">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-[#540863] text-white rounded-xl w-10 h-10 flex items-center justify-center font-bold">
                A
              </div>
              <h3 className="text-xl font-bold text-gray-900">Appointify</h3>
            </div>

            <p className="mt-4 text-sm text-black max-w-sm leading-relaxed">
              Appointify helps you book appointments with trusted hospitals,
              clinics, salons, and diagnostic centers — quickly and hassle-free.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-4 mt-6">
              <a
                className="text-black hover:text-[#540863] transition"
                href="#"
              >
                <Twitter size={18} />
              </a>
              <a
                className="text-black hover:text-[#540863] transition"
                href="#"
              >
                <Instagram size={18} />
              </a>
              <a
                className="text-black hover:text-[#540863] transition"
                href="#"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">
              Explore
            </h4>
            <ul className="space-y-3 text-sm text-black">
              <li>
                <a href="#" className="hover:text-[#540863]">
                  Book Appointment
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#540863]">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#540863]">
                  My Appointments
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#540863]">
                  List Your Business
                </a>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-black">
              <li>
                <a href="#" className="hover:text-[#540863]">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#540863]">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#540863]">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#540863]">
                  Partner With Us
                </a>
              </li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">
              Support
            </h4>
            <ul className="space-y-3 text-sm text-black">
              <li className="flex items-center gap-2">
                <Phone size={14} />
                <span>+1 123 456 7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} />
                <a
                  href="mailto:support@appointify.com"
                  className="hover:text-[#540863]"
                >
                  support@appointify.com
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#540863]">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#540863]">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 pt-6 border-t border-rose-100 flex flex-col md:flex-row items-center justify-between text-sm text-black">
          <p>© {new Date().getFullYear()} Appointify. All rights reserved.</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#540863]">
              Terms
            </a>
            <a href="#" className="hover:text-[#540863]">
              Privacy
            </a>
            <a href="#" className="hover:text-[#540863]">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
