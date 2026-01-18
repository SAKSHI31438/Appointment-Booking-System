import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Salon Owner",
    rating: 5,
    quote:
      "This platform helped me fill my calendar and manage bookings without stress. The dashboard is easy to use and the support is fantastic!",
  },
  {
    id: 2,
    name: "Amit Verma",
    role: "Freelance Plumber",
    rating: 5,
    quote:
      "I started getting regular bookings within weeks. The verification process built trust with customers and my business grew.",
  },
  {
    id: 3,
    name: "Neha Kapoor",
    role: "Home Tutor",
    rating: 4,
    quote:
      "Simple, reliable and efficient. The booking flow is smooth and my students love the reminders.",
  },
  {
    id: 4,
    name: "Ravi Patel",
    role: "Beauty Therapist",
    rating: 5,
    quote:
      "A beautiful interface with powerful scheduling tools — great for small businesses.",
  },
  {
    id: 4,
    name: "Ravi Patel",
    role: "Beauty Therapist",
    rating: 5,
    quote:
      "A beautiful interface with powerful scheduling tools — great for small businesses.",
  },
  {
    id: 4,
    name: "Ravi Patel",
    role: "Beauty Therapist",
    rating: 5,
    quote:
      "A beautiful interface with powerful scheduling tools — great for small businesses.",
  },
];

const Avatar = ({ name }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
  return (
    <div className="w-12 h-12 rounded-full bg-rose-50 text-[#540863] flex items-center justify-center font-semibold">
      {initials}
    </div>
  );
};

const Review = () => {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            What our customers say
          </h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Real stories from businesses and customers who use our platform to
            grow and succeed.
          </p>
        </div>

        {/* Cards: horizontal scroll on small screens, grid on md+ */}
        <div className="mt-8">
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {testimonials.map((t) => (
                <article
                  key={t.id}
                  className="bg-white rounded-2xl p-6 border border-rose-50 shadow-sm hover:shadow-md transition"
                  aria-labelledby={`testimonial-${t.id}`}
                >
                  <div className="flex items-start gap-4">
                    <Avatar name={t.name} />
                    <div>
                      <h3
                        id={`testimonial-${t.id}`}
                        className="text-sm font-semibold text-gray-900"
                      >
                        {t.name}
                      </h3>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                  </div>

                  <div className="mt-4 text-gray-700 text-sm leading-relaxed">
                    <svg
                      width="36"
                      height="28"
                      viewBox="0 0 36 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="inline-block text-rose-200 mr-2"
                    >
                      <path d="M10 0h6v8h-6z" fill="#fff0f2" />
                      <path d="M2 0h6v8H2z" fill="#fff0f2" />
                    </svg>
                    {t.quote}
                  </div>

                  <div className="mt-4 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={`${
                          i < t.rating ? "text-[#540863]" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-[#540863] hover:bg-[#390644] text-white font-semibold py-3 px-5 rounded-lg shadow-md transition"
          >
            Read more reviews
          </a>
        </div>
      </div>
    </section>
  );
};

export default Review;
