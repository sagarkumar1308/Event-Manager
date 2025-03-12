import React, { useState } from "react";
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Communion</h1>
        </div>
        
        {/* Hamburger button for mobile */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li><Link to="/" className="text-gray-700 hover:text-indigo-600">Home</Link></li>
            <li><Link to="/events" className="text-gray-700 hover:text-indigo-600">Events</Link></li>
            <li><Link to="/about" className="text-gray-700 hover:text-indigo-600">About</Link></li>
          </ul>
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="absolute top-16 right-0 w-64 bg-white shadow-lg rounded-lg py-2 md:hidden">
            <ul className="flex flex-col space-y-2">
              <li className="px-4">
                <Link to="/" className="block text-gray-700 hover:text-indigo-600">Home</Link>
              </li>
              <li className="px-4">
                <Link to="/events" className="block text-gray-700 hover:text-indigo-600">Events</Link>
              </li>
              <li className="px-4">
                <Link to="/about" className="block text-gray-700 hover:text-indigo-600">About</Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
