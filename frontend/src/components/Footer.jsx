import React from "react";

const Footer = () => {
  return (
    <footer className="mt-16 px-6 py-12 text-gray-700">

      {/* TOP */}
      <div className="max-w-6xl mx-auto mb-12 border-b pb-12">

        {/* NEWSLETTER */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold">zyra</h2>
          <p className="text-gray-500 mb-4">Best clean shopify theme</p>

          <div className="flex justify-center">
            <input
              type="email"
              placeholder="Email Address"
              className="border px-4 py-2 w-64"
            />
            <button className="bg-[#38e5bd] text-white px-4">
              SUBSCRIBE
            </button>
          </div>
        </div>

        {/* LINKS */}
        <div className="flex flex-col md:flex-row justify-between gap-8 text-center md:text-left">

          {/* LEFT */}
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-[#38e5bd]">My Account</a></li>
            <li><a href="/" className="hover:text-[#38e5bd]">Log In</a></li>
            <li><a href="/" className="hover:text-[#38e5bd]">My Addresses</a></li>
            <li><a href="/" className="hover:text-[#38e5bd]">My Orders</a></li>
            <li><a href="/" className="hover:text-[#38e5bd]">Contact Us</a></li>
            <li><a href="/" className="hover:text-[#38e5bd]">Latest News</a></li>
          </ul>

          {/* CENTER */}
          <div className="text-center">
            <p>
              14/15, 2nd Floor, 1st Main Road<br />
              New York, NY 10012, US
            </p>
          </div>

          {/* RIGHT */}
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-[#38e5bd]">About Us</a></li>
            <li><a href="/" className="hover:text-[#38e5bd]">All Collections</a></li>
            <li><a href="/" className="hover:text-[#38e5bd]">Contact Us</a></li>
            <li><a href="/" className="hover:text-[#38e5bd]">Search</a></li>
            <li><a href="/" className="hover:text-[#38e5bd]">Blog</a></li>
          </ul>

        </div>
      </div>

      {/* BOTTOM */}
      <div className="text-center space-y-4">

        {/* SOCIAL */}
        <div className="flex justify-center gap-4 text-lg">
          <i className="bi bi-facebook cursor-pointer hover:text-[#38e5bd]"></i>
          <i className="bi bi-twitter cursor-pointer hover:text-[#38e5bd]"></i>
          <i className="bi bi-youtube cursor-pointer hover:text-[#38e5bd]"></i>
          <i className="bi bi-linkedin cursor-pointer hover:text-[#38e5bd]"></i>
          <i className="bi bi-pinterest cursor-pointer hover:text-[#38e5bd]"></i>
        </div>

        <p className="text-sm text-gray-400">
          © 2026 - Zyra . All rights reserved
        </p>

      </div>
    </footer>
  );
};

export default Footer;