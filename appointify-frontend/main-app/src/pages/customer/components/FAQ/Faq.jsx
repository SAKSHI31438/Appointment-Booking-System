import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const faqData = [
  {
    question: "How do I book an appointment?",
    answer:
      "You can book an appointment by selecting your preferred service provider, choosing an available date and time slot, and confirming your details. Once submitted, your booking request will be sent to the provider for approval.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Yes, you can cancel your booking from the 'My Bookings' page. If your appointment is still pending or approved, you will see a Cancel button. Once cancelled, the status will update immediately.",
  },
  {
    question: "How will I know if my booking is approved?",
    answer:
      "You can track your booking status in the My Bookings section. The status will be updated to Approved, Rejected, or Cancelled based on the provider’s response.",
  },
  {
    question: "Is there any cancellation fee?",
    answer:
      "Currently, there is no cancellation fee. However, certain service providers may apply their own policies in the future.",
  },
  {
    question: "Can I reschedule my appointment?",
    answer:
      "At the moment, direct rescheduling is not available. You can cancel your existing booking and create a new appointment with your preferred date and time.",
  },
  {
    question: "Is my personal information secure?",
    answer:
      "Yes, we prioritize your privacy and data security. All user information is securely stored and protected using industry-standard security practices.",
  },
  {
    question: "What types of services can I book?",
    answer:
      "You can book appointments for hospitals, dental clinics, diagnostic centers, fitness studios, beauty & skin care services, and more.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#FFD3D5] mt-20 px-6 py-16">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#540863]">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-700 mt-3 text-lg">
            Find answers to common questions about booking, cancellations, and
            managing your appointments.
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-5 text-left"
              >
                <span className="text-lg font-semibold text-[#540863]">
                  {faq.question}
                </span>

                <ChevronDown
                  size={22}
                  className={`transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`px-6 transition-all duration-300 ease-in-out ${
                  activeIndex === index
                    ? "max-h-96 pb-6 opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* SUPPORT SECTION */}
        <div className="mt-16 text-center bg-white rounded-2xl shadow-md p-8">
          <h3 className="text-2xl font-semibold text-[#540863] mb-3">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            If you couldn't find the answer you were looking for, feel free to
            contact our support team.
          </p>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-xl bg-[#540863] text-white font-medium hover:bg-purple-800 transition"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Faq;
