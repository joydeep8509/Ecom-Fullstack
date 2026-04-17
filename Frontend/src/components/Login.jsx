import axios from "../axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", user);
      localStorage.setItem("token", res.data);
      window.location.href = "/";
    } catch (error) {
      console.error("Login Error:", error);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Sign In
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* EMAIL */}
          <div>
            <h6 className="mb-1 font-semibold">Email</h6>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
              className="w-full border px-4 py-3 rounded"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <h6 className="mb-1 font-semibold">Password</h6>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
              className="w-full border px-4 py-3 rounded"
            />
          </div>

          {/* BUTTON */}
          <button className="w-full bg-[#38e5bd] text-white py-2 font-bold">
            Login
          </button>

          {/* LINK */}
          <p className="text-center text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#38e5bd] font-bold">
              Sign up
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}