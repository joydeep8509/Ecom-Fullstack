import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import AppContext from "../Context/Context";

const Navbar = ({ onSelectCategory }) => {
  const { cart } = useContext(AppContext);

  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const token = localStorage.getItem("token");

  let email = "";
  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      email = decoded.sub || "";
    } catch (err) {
      console.error("Invalid token");
    }
  }

  const userInitial = email ? email.charAt(0).toUpperCase() : "U";

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("/products");
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = async (value) => {
    setInput(value);

    if (value.length >= 1) {
      setShowSearchResults(true);

      try {
        const response = await axios.get(
          `/products/search?keyword=${value}`
        );
        setSearchResults(response.data);
        setNoResults(response.data.length === 0);
      } catch (error) {
        console.error("Search error:", error);
      }
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
      setNoResults(false);
    }
  };

  const categories = [
    "Laptop",
    "Headphone",
    "Mobile",
    "Electronics",
    "Toys",
    "Fashion",
  ];

  return (
    <header>
      <nav className="fixed top-0 w-full bg-white shadow-sm z-50 border-b border-gray-100">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between px-6 py-4 relative">

          {/* LEFT: HAMBURGER (Mobile Only) & LOGO */}
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden text-slate-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>

            <Link
              to="/"
              className="text-2xl font-black tracking-tighter text-slate-900"
            >
              zyra
            </Link>
          </div>

          {/* CENTER LINKS (Desktop Only) */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
            <Link to="/" className="hover:text-[#38e5bd] transition">
              Home
            </Link>

            {token && (
              <Link to="/add_product" className="hover:text-[#38e5bd] transition">
                Add Product
              </Link>
            )}

            {/* CATEGORY DROPDOWN */}
            <div className="relative group">
              <button className="hover:text-[#38e5bd] transition py-2 flex items-center gap-1">
                Categories
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 opacity-50"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <div className="absolute top-[100%] left-0 hidden group-hover:block bg-white shadow-xl rounded-md min-w-[180px] border border-gray-100 py-2">
                <button
                  onClick={() => onSelectCategory("")}
                  className="block px-5 py-2 hover:bg-gray-50 hover:text-[#38e5bd] w-full text-left text-sm border-b"
                >
                  All Categories
                </button>

                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => onSelectCategory(category)}
                    className="block px-5 py-2 hover:bg-gray-50 hover:text-[#38e5bd] w-full text-left text-sm"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE (Search, Cart, Profile) */}
          <div className="flex items-center gap-4 relative">

            {/* SEARCH (Desktop Only) */}
            <div className="relative hidden sm:block">
              <input
                className="border border-gray-200 rounded-full px-4 py-2 text-sm w-[220px] focus:outline-none focus:border-[#38e5bd]"
                type="search"
                placeholder="Search products..."
                value={input}
                onChange={(e) => handleChange(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              />
            </div>

            {/* SEARCH DROPDOWN (Desktop) */}
            {showSearchResults && searchFocused && (
              <ul className="absolute top-[110%] right-0 w-[260px] bg-white shadow-xl border rounded-md z-50">
                {searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <li key={result.id}>
                      <Link
                        to={`/product/${result.id}`}
                        className="block px-4 py-3 text-sm hover:bg-gray-50"
                      >
                        {result.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  noResults && (
                    <p className="p-4 text-red-500 text-sm text-center">
                      No Products Found
                    </p>
                  )
                )}
              </ul>
            )}

            {/* CART */}
            <Link to="/cart" className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-slate-700 hover:text-[#38e5bd]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 10V6a4 4 0 10-8 0v4M5 10h14l-1 10H6L5 10z"
                />
              </svg>

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#38e5bd] text-white text-[10px] px-1.5 rounded-full font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* AUTH / AVATAR */}
            {!token ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login" className="text-sm font-bold">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-[#38e5bd] text-white px-4 py-2 rounded-full text-sm font-bold"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="relative">
                <div
                  onClick={() => setShowProfile(!showProfile)}
                  className="w-8 h-8 rounded-full bg-[#38e5bd] text-white flex items-center justify-center font-bold cursor-pointer"
                >
                  {userInitial}
                </div>

                {showProfile && (
                  <div className="absolute right-0 mt-3 w-44 bg-white shadow-lg border rounded-md py-2 z-50">
                    <p className="px-4 py-2 text-xs text-gray-500 border-b truncate">
                      {email}
                    </p>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-red-500"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-[100%] left-0 w-full bg-white border-b border-gray-100 shadow-xl px-6 py-4 flex flex-col gap-4 z-40">
            
            {/* Mobile Search */}
            <div className="relative sm:hidden">
              <input
                className="border border-gray-200 rounded px-4 py-2 text-sm w-full focus:outline-none focus:border-[#38e5bd]"
                type="search"
                placeholder="Search products..."
                value={input}
                onChange={(e) => handleChange(e.target.value)}
              />
              {/* Mobile Search Results */}
              {input.length >= 1 && searchResults.length > 0 && (
                <ul className="bg-white border mt-1 rounded-md max-h-40 overflow-y-auto">
                  {searchResults.map((result) => (
                    <li key={result.id}>
                      <Link
                        to={`/product/${result.id}`}
                        className="block px-4 py-2 text-sm hover:bg-gray-50"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {result.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold text-slate-700">Home</Link>
            
            {token && (
              <Link to="/add_product" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold text-slate-700">Add Product</Link>
            )}

            <div className="border-t border-gray-100 pt-4">
              <p className="text-xs text-gray-400 font-bold mb-2 uppercase">Categories</p>
              <button 
                onClick={() => { onSelectCategory(""); setIsMobileMenuOpen(false); }} 
                className="block py-2 text-sm text-slate-700 w-full text-left"
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => { onSelectCategory(category); setIsMobileMenuOpen(false); }}
                  className="block py-2 text-sm text-slate-700 w-full text-left"
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Auth for Mobile */}
            {!token && (
              <div className="border-t border-gray-100 pt-4 flex flex-col gap-2 sm:hidden">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-center text-sm font-bold border border-gray-200 py-2 rounded">Login</Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="text-center text-sm font-bold bg-[#38e5bd] text-white py-2 rounded">Sign Up</Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;