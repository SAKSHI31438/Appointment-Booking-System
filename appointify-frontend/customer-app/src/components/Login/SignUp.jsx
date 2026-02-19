import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const router = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/api/customer-auth/customerRegister",
        formData,
      );
      if (res.status === 200) {
        toast.success("Signup Successful ✅");
      }

      router("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-rose-50 to-purple-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Create Account
          </h2>
          <p className="text-sm text-gray-500 mt-1">Signup to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-5">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter your name"
              className="w-full mt-1 rounded-lg border px-4 py-2 focus:ring-2 border-gray-300 outline-none"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Phone Number
            </label>
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              maxLength="10"
              type="tel"
              placeholder="10 digit number"
              className="w-full mt-1 rounded-lg border px-4 py-2 focus:ring-2 border-gray-300 outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter email"
              className="w-full mt-1 rounded-lg border px-4 py-2 focus:ring-2 border-gray-300 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Enter password"
              className="w-full mt-1 rounded-lg border px-4 py-2 focus:ring-2 border-gray-300 outline-none"
              required
            />
          </div>

          {/* Button */}
          <button
            disabled={loading}
            className="w-full bg-[#540863] hover:bg-[#390644] text-white font-medium py-2.5 rounded-lg transition"
          >
            {loading ? "Creating Account..." : "Signup"}
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-500">
            Already have account?{" "}
            <span
              onClick={() => router("/login")}
              className="text-[#540863] cursor-pointer font-medium hover:underline"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
