import React, { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPackages() {
      const { data, error } = await supabase
  .from("packages")
  .select(`
    id,
    name,
    description,
    price,
    destination:destination_id (
      id,
      name,
      image_url,
      description,
      price
    )
  `);


      if (error) {
        console.error("Error fetching packages:", error);
        setError(error.message);
      } else {
        console.log("Fetched packages:", data); // 👀 check in browser console
        setPackages(data);
      }
      setLoading(false);
    }

    fetchPackages();
  }, []);

  if (loading) return <p className="text-center py-10">Loading packages...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (packages.length === 0)
    return <p className="text-center text-gray-500">No packages found.</p>;

  return (
    <section className="py-20 bg-gray-50">
      <h2 className="text-4xl font-bold text-center text-emerald-700 mb-10">
        Travel Packages
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition-transform"
          >
            {pkg.destination?.image_url && (
              <img
                src={pkg.destination.image_url}
                alt={pkg.destination.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold">{pkg.name}</h3>
              <p className="text-gray-600 mb-2">{pkg.description}</p>
              <p className="text-sm text-gray-500">
                Destination: {pkg.destination?.name}
              </p>
              <p className="text-emerald-700 font-bold mt-2">
                USD {pkg.price} / {pkg.duration} 3 days
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
