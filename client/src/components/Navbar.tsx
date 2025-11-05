


import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav className="w-full bg-white py-3 px-4 md:px-10 lg:px-20 flex flex-col md:flex-row items-center justify-between shadow-lg gap-3 md:gap-0">
      {/* Logo */}
      <div className="flex items-center justify-center md:justify-start w-full md:w-auto">
        <img src={logo} alt="Logo" className="h-10 md:h-12 object-contain" />
      </div>

      {/* Search Bar */}
      <div className="flex items-center space-x-2 w-full md:w-auto justify-center md:justify-end">
        <input
          type="text"
          placeholder="Search experiences"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            onSearch(e.target.value);
          }}
          disabled={!isHomePage}
          className={`w-full sm:w-60 md:w-72 lg:w-80 px-4 py-2 rounded-md text-sm focus:outline-none transition-all duration-200 ${
            isHomePage
              ? "bg-[#EDEDED] text-gray-800 placeholder-[#727272]"
              : "bg-gray-200 text-gray-500 placeholder-gray-400 cursor-not-allowed"
          }`}
        />
        <button
          disabled={!isHomePage}
          className={`font-semibold px-4 py-2 rounded-md text-sm transition-all duration-200 ${
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
