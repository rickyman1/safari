// src/components/Rooms.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRooms() {
      const { data, error } = await supabase.from("rooms").select("*");
      if (error) console.error("Error fetching rooms:", error);
      else setRooms(data);
      setLoading(false);
    }
    fetchRooms();
  }, []);

  if (loading) return <p className="text-center text-gray-600 py-20">Loading rooms...</p>;

  if (rooms.length === 0)
    return <p className="text-center text-gray-500 py-20">No rooms available.</p>;

  return (
    <section id="rooms" className="py-20 bg-gray-50">
      <h2 className="text-4xl font-bold text-center text-emerald-700 mb-10">
        Available Rooms
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-transform hover:scale-105"
          >
            <img
              src={room.image_url}
              alt={room.room_type}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {room.room_type}
              </h3>
              <p className="text-gray-600">
                Price: ${room.price_per_night} / night
              </p>
              <p
                className={`mt-2 font-medium ${
                  room.availability ? "text-green-600" : "text-red-500"
                }`}
              >
                {room.availability ? "Available" : "Available"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
