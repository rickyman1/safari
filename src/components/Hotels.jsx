// src/components/Hotels.jsx (simplified)
import React, { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import BookingModal from "./BookingModal";

export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHotels() {
      const { data, error } = await supabase.from("hotels").select("*");
      if (error) console.error("Error fetching hotels:", error);
      else setHotels(data);
      setLoading(false);
    }
    fetchHotels();
  }, []);

  if (loading) return <p className="text-center text-gray-600 py-20">Loading hotels...</p>;

  if (hotels.length === 0)
    return <p className="text-center text-gray-500 py-20">No hotels available.</p>;

  return (
    <section id="hotels" className="py-20 bg-white">
      <h2 className="text-4xl font-bold text-center text-emerald-700 mb-10">
        Hotels & Lodges
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-gray-50 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform"
          >
            <img
              src={hotel.image_url}
              alt={hotel.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-emerald-800">{hotel.name}</h3>
              <p className="text-gray-600">{hotel.location}</p>
              <p className="mt-2 text-gray-700 text-sm">{hotel.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
