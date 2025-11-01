import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data, error } = await supabase.from("packages").select("*");
        if (error) throw error;
        setPackages(data);
      } catch (err) {
        console.error("Error fetching packages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Loading packages...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-green-800">
        Explore Our Travel Packages
      </h1>
      <p className="text-center text-gray-600 mb-12">
        Discover affordable tour packages for your dream destinations across Kenya.
      </p>

      {packages.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No packages available. Please check back later.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={pkg.image_url}
                alt={pkg.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {pkg.name}
                </h2>
                <p className="text-gray-600 mb-2">{pkg.location}</p>
                <p className="text-gray-500 mb-4 text-sm">
                  {pkg.description}
                </p>
                <p className="text-blue-600 font-semibold text-lg mb-2">
                  ${pkg.price}
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  Duration: {pkg.duration}
                </p>
                <button
                  onClick={() => setSelectedPackage(pkg)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Book Package
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedPackage && (
        <PackageBookingModal
          pkg={selectedPackage}
          onClose={() => setSelectedPackage(null)}
        />
      )}
    </div>
  );
}

const PackageBookingModal = ({ pkg, onClose }) => {
  const [form, setForm] = useState({ name: "", email: "", date: "" });

  if (!pkg) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from("package_bookings").insert([
      {
        package_id: pkg.id,
        name: form.name,
        email: form.email,
        date: form.date,
      },
    ]);

    if (error) {
      console.error("Booking error:", error);
      alert("Failed to book package. Please try again.");
    } else {
      alert("Package booking successful!");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">
          Book {pkg ? pkg.name : "Package"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your name"
            className="w-full border rounded p-2 mb-3"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded p-2 mb-3"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="date"
            className="w-full border rounded p-2 mb-3"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Confirm Booking
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Packages;
