// src/components/Hotels.jsx (simplified)
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import BookingModal from "./BookingModal";

export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      const { data, error } = await supabase.from("hotels").select("*");
      if (error) console.error(error);
      else setHotels(data || []);
      setLoading(false);
    };
    fetchHotels();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading hotels...</div>;

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {hotels.map(h => (
          <div key={h.id} className="bg-white rounded-lg shadow">
            <img src={h.image_url} alt={h.name} className="w-full h-44 object-cover" />
            <div className="p-4">
              <h3 className="font-bold">{h.name}</h3>
              <p className="text-sm text-gray-600">{h.location}</p>
              <p className="font-semibold mt-2">KSh {h.price}</p>
              <button onClick={() => setSelectedHotel(h)} className="mt-3 bg-green-600 text-white px-3 py-1 rounded">Book Now</button>
            </div>
          </div>
        ))}
      </div>
      {selectedHotel && <BookingModal hotel={selectedHotel} onClose={() => setSelectedHotel(null)} />}
    </section>
  );
}
