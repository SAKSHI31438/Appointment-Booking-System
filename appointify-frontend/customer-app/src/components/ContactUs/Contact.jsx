import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen  flex items-center justify-center px-4 mt-12">
      <div className="w-full max-w-5xl  overflow-hidden">
        {/* Header */}
        <div className="text-center py-2 px-4">
          <h2 className="text-3xl font-bold text-gray-800">Get In Touch</h2>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto">
            We’ll create high-quality content and build strong connections to
            help grow your brand and rankings.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-10 mt-3">
          {/* Left Info Panel */}
          <div className="md:col-span-1 bg-[#92487A] text-white rounded-xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Contact Information
              </h3>
              <p className="text-sm92487A mb-6">
                Feel free to reach out to us anytime. We’d love to hear from
                you.
              </p>

              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <Phone size={18} />
                  <span>+91 12345678</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} />
                  <span>support@appointify.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={18} />
                  <span>Silvassa, India</span>
                </div>
              </div>
            </div>

            <div className="mt-8 text-xs text-white">© 2026 Appointify</div>
          </div>

          {/* Right Form */}
          <div className="md:col-span-2 bg-white rounded-xl p-6">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-600">Your Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full border-b border-gray-300 focus:border-[#390644] outline-none py-2"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Your Email</label>
                <input
                  type="email"
                  placeholder="hello@example.com"
                  className="w-full border-b border-gray-300 focus:border-[#390644] outline-none py-2"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-gray-600">Subject</label>
                <input
                  type="text"
                  placeholder="I want to hire you quickly"
                  className="w-full border-b border-gray-300 focus:border-[#390644] outline-none py-2"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-gray-600">Message</label>
                <textarea
                  rows="4"
                  placeholder="Write your message here..."
                  className="w-full border-b border-gray-300 focus:border-[#390644] outline-none py-2 resize-none"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="bg-[#540863]  hover:bg-[#390644]  text-white px-6 py-3 rounded-lg transition"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
