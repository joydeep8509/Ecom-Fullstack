import axios from "../axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/signup", user);
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* NAME */}
          <div>
            <h6 className="mb-1 font-semibold">Name</h6>
            <input
              type="text"
              placeholder="Enter your full name"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              required
              className="w-full border px-4 py-3 rounded"
            />
          </div>

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
              placeholder="Create a password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
              className="w-full border px-4 py-3 rounded"
            />
          </div>

          {/* BUTTON */}
          <button className="w-full bg-[#38e5bd] text-white py-2 font-bold">
            Sign Up
          </button>

          {/* LINK */}
          <p className="text-center text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-[#38e5bd] font-bold">
              Sign in
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}