import React, { useState } from "react";
import bg from "../assets/Images/14.jpg";
export default function HeaderComponent() {
  const handleContextMenu = (e) => {
    e.preventDefault();
  };
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  return (
<div className="top-container bg-blue-500 relative text-center">
  <img
    src={bg}
    alt="banner"
    className="w-full"
    onContextMenu={handleContextMenu}
  />
  <div className="top-right absolute right-10 top-4">
    <div
      className="relative group"
      onMouseEnter={toggleDropdown}
      onMouseLeave={toggleDropdown}
    >
      <div className="w-10 h-10 bg-blue-300 rounded-full flex items-center justify-center cursor-pointer">
        <span className="text-white text-s">DC</span>
      </div>
      {isDropdownOpen && (
        <div className="absolute right-0 bg-white border rounded shadow-lg">
          <a
            href="#"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 no-underline hover:no-underline"
          >
            Profile
          </a>
          <a
            href="/"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 no-underline hover:no-underline"
          >
            Logout
          </a>
        </div>
      )}
    </div>
  </div>
  <div className="centered absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3">
    <div className="flex items-center w-full">
      <div className="flex-1 h-px bg-white"></div>
      <h3 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl px-4">
        Knowledge Hub
      </h3>
      <div className="flex-1 h-px bg-white"></div>
    </div>
    <div className="w-full mt-4">
      <h4 className="text-gray-300 text-base sm:text-xl md:text-2xl">
        D365 F&O Developers Resource
      </h4>
    </div>
  </div>
</div>
  

  );
}
