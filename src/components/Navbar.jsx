// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-green-700 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Explore Kenya</Link>
        <div className="space-x-6">
          <Link to="/" className="hover:text-yellow-300">Home</Link>
          <Link to="/hotels" className="hover:text-yellow-300">Hotels</Link>
          <Link to="/packages" className="hover:text-yellow-300">Packages</Link>
          <Link to="/subscribe" className="hover:text-yellow-300">Subscribe</Link>
          <Link to="/login" className="hover:text-yellow-300">Admin</Link>
        </div>
      </div>
    </nav>
  );
}
