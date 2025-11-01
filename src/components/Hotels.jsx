import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import BookingModal from "./BookingModal";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHotel, setSelectedHotel] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const { data, error } = await supabase.from("hotels").select("*");
        if (error) throw error;
        setHotels(data);
      } catch (err) {
        console.error("Error fetching hotels:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Loading hotels...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-green-800">
        Explore Our Hotels
      </h1>

      {hotels.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No hotels found. Please check your database.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={hotel.image_url}
                alt={hotel.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {hotel.name}
                </h2>
                <p className="text-gray-600 mb-2">{hotel.location}</p>
                <p className="text-gray-500 mb-4 text-sm">
                  {hotel.description}
                </p>
                <p className="text-blue-600 font-semibold text-lg mb-4">
                  ${hotel.price} / night
                </p>
                <button
                  onClick={() => setSelectedHotel(hotel)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedHotel && (
        <BookingModal
          hotel={selectedHotel}
          onClose={() => setSelectedHotel(null)}
        />
      )}
    </div>
  );
};

export default Hotels;
