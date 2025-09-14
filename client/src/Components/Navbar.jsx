import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">Examock</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <a href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </a>
          <a href="/features" className="text-gray-700 hover:text-blue-600">
            Features
          </a>
          <a href="/pricing" className="text-gray-700 hover:text-blue-600">
            Pricing
          </a>
          <a href="/about" className="text-gray-700 hover:text-blue-600">
            About
          </a>
          <a href="/contact" className="text-gray-700 hover:text-blue-600">
            Contact
          </a>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Login
          </button>
          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
            Signup
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <a href="/" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">
            Home
          </a>
          <a
            href="/features"
            className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
          >
            Features
          </a>
          <a
            href="/pricing"
            className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
          >
            Pricing
          </a>
          <a
            href="/about"
            className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
          >
            About
          </a>
          <a
            href="/contact"
            className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
          >
            Contact
          </a>
          <div className="flex space-x-4 px-4 py-2">
            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Login
            </button>
            <button className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
              Signup
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
