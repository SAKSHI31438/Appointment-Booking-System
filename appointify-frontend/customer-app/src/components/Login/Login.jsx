import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/api/customer-auth/customerLogin",
        formData,
      );

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success("Login Successful ✅");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-rose-50 to-purple-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-1">Login to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full mt-1 rounded-lg border px-4 py-2 border-gray-300 focus:ring-2 focus:ring-[#540863] outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full mt-1 rounded-lg border px-4 py-2 border-gray-300 focus:ring-2 focus:ring-[#540863] outline-none"
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-[#540863] hover:bg-[#390644] text-white font-medium py-2.5 rounded-lg transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-[#540863] cursor-pointer font-medium hover:underline"
            >
              Signup
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
