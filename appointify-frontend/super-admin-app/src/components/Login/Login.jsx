import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useNavigate();

  // Step 1: Just move to OTP screen
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone.length === 10) {
      setStep(2);
    }
  };

  // Step 2: Login API call
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:3000/api/auth/login", {
        phoneNumber: phone,
        otp: otp,
        role: "SUPER_ADMIN",
      });
      console.log(res);

      console.log("Login Success:", res.data);

      // store token & user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login Successful");

      router("/home");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-rose-50 to-purple-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Super Admin</h2>
          <h2 className="text-2xl font-semibold text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-1">
            Login using OTP verification
          </p>
        </div>

        {/* Step 1: Phone Number */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                maxLength="10"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter 10 digit number"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#540863] focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#540863] hover:bg-[#390644] text-white font-medium py-2.5 rounded-lg transition"
            >
              Send OTP
            </button>
          </form>
        )}

        {/* Step 2: OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Enter OTP
              </label>
              <input
                type="text"
                maxLength="4"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="••••"
                className="w-full tracking-widest text-center text-lg rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#540863] focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#540863] hover:bg-[#390644] text-white font-medium py-2.5 rounded-lg transition"
            >
              {loading ? "Logging in..." : "Verify & Login"}
            </button>

            <p className="text-sm text-center text-gray-500">
              Didn’t receive OTP?{" "}
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-[#540863] font-medium hover:underline"
              >
                Resend
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
