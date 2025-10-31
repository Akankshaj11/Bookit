import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const location = useLocation();

  // ✅ Check if we are on the Home page
  const isHomePage = location.pathname === "/";

  return (
    <nav className="w-full bg-white py-3 px-[124px] flex items-center justify-between shadow-lg">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="h-12 w-auto object-contain" />
      </div>

      {/* Right: Search Bar */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search experiences"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            onSearch(e.target.value);
          }}
          disabled={!isHomePage} // ✅ Disabled on other pages
          className={`px-4 py-2 w-64 rounded-[4px] focus:outline-none transition-all duration-200 ${
            isHomePage
              ? "bg-[#EDEDED] text-gray-800 placeholder-[#727272]"
              : "bg-gray-200 text-gray-500 placeholder-gray-400 cursor-not-allowed"
          }`}
        />
        <button
          disabled={!isHomePage} // ✅ Disable search button too
          className={`font-semibold px-4 py-2 rounded-[4px] transition-all duration-200 ${
            isHomePage
              ? "bg-[#FFD643] text-gray-800 hover:bg-yellow-400"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Search
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
