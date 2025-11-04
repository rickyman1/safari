// src/components/Destinations.jsx
import { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const { data, error } = await supabase
          .from("destination") // table name
          .select("id, name, image_url, description");

        if (error) throw error;
        setDestinations(data);
      } catch (error) {
        console.error("Error fetching destinations:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading) {
    return (
      <section className="py-20 text-center">
        <p className="text-gray-600 text-lg">Loading destinations...</p>
      </section>
    );
  }

  return (
    <section id="destinations" className="py-20 bg-gray-50">
      <h2 className="text-4xl font-bold text-center text-emerald-700 mb-10">
        Top Tourist Destinations
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
        {destinations.length > 0 ? (
          destinations.map((place) => (
            <div
              key={place.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform"
            >
              <img
                src={place.image_url}
                alt={place.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {place.name}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {place.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-4">
            No destinations found.
          </p>
        )}
      </div>
    </section>
  );
}
