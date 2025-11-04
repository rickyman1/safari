// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-green-700 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Explore Kenya</Link>
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className={`${isOpen ? 'block absolute top-full left-0 right-0 bg-green-700 md:relative md:top-auto md:left-auto md:right-auto md:bg-transparent md:flex md:space-x-6' : 'hidden'}`}>
          <Link to="/" className="block hover:text-yellow-300 py-2 md:py-0 px-6 md:px-0" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/hotels" className="block hover:text-yellow-300 py-2 md:py-0 px-6 md:px-0" onClick={() => setIsOpen(false)}>Hotels</Link>
          <Link to="/rooms" className="block hover:text-yellow-300 py-2 md:py-0 px-6 md:px-0" onClick={() => setIsOpen(false)}>Rooms</Link>
          <Link to="/packages" className="block hover:text-yellow-300 py-2 md:py-0 px-6 md:px-0" onClick={() => setIsOpen(false)}>Packages</Link>
          <Link to="/subscribe" className="block hover:text-yellow-300 py-2 md:py-0 px-6 md:px-0" onClick={() => setIsOpen(false)}>Subscribe</Link>
          <Link to="/admin" className="block hover:text-yellow-300 py-2 md:py-0 px-6 md:px-0" onClick={() => setIsOpen(false)}>Admin</Link>
        </div>
      </div>
    </nav>
  );
}
