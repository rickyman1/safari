import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const AdminDashboard = () => {
  const [hotels, setHotels] = useState([]);
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [packageBookings, setPackageBookings] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [activeTab, setActiveTab] = useState("hotels");
  const [editingHotel, setEditingHotel] = useState(null);
  const [editingPackage, setEditingPackage] = useState(null);
  const [newHotel, setNewHotel] = useState({
    name: "",
    location: "",
    price: "",
    image_url: "",
    description: "",
  });
  const [newPackage, setNewPackage] = useState({
    name: "",
    location: "",
    price: "",
    image_url: "",
    description: "",
    duration: "",
  });

  // Fetch all data
  const fetchHotels = async () => {
    const { data, error } = await supabase.from("hotels").select("*");
    if (error) console.error("Error fetching hotels:", error);
    else setHotels(data);
  };

  const fetchPackages = async () => {
    const { data, error } = await supabase.from("packages").select("*");
    if (error) console.error("Error fetching packages:", error);
    else setPackages(data);
  };

  const fetchBookings = async () => {
    const { data, error } = await supabase.from("bookings").select("*");
    if (error) console.error("Error fetching bookings:", error);
    else setBookings(data);
  };

  const fetchPackageBookings = async () => {
    const { data, error } = await supabase.from("package_bookings").select("*");
    if (error) console.error("Error fetching package bookings:", error);
    else setPackageBookings(data);
  };

  const fetchSubscribers = async () => {
    const { data, error } = await supabase.from("subscribers").select("*");
    if (error) console.error("Error fetching subscribers:", error);
    else setSubscribers(data);
  };

  useEffect(() => {
    fetchHotels();
    fetchPackages();
    fetchBookings();
    fetchPackageBookings();
    fetchSubscribers();
  }, []);

  // Hotel operations
  const handleAddHotel = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("hotels").insert([newHotel]);
    if (error) {
      alert("Error adding hotel");
      console.error(error);
    } else {
      alert("Hotel added successfully!");
      setNewHotel({ name: "", location: "", price: "", image_url: "", description: "" });
      fetchHotels();
    }
  };

  const handleEditHotel = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("hotels").update(newHotel).eq("id", editingHotel.id);
    if (error) {
      alert("Error updating hotel");
      console.error(error);
    } else {
      alert("Hotel updated successfully!");
      setEditingHotel(null);
      setNewHotel({ name: "", location: "", price: "", image_url: "", description: "" });
      fetchHotels();
    }
  };

  const handleDeleteHotel = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this hotel?");
    if (confirmDelete) {
      const { error } = await supabase.from("hotels").delete().eq("id", id);
      if (error) {
        alert("Error deleting hotel");
      } else {
        alert("Hotel deleted successfully!");
        fetchHotels();
      }
    }
  };

  // Package operations
  const handleAddPackage = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("packages").insert([newPackage]);
    if (error) {
      alert("Error adding package");
      console.error(error);
    } else {
      alert("Package added successfully!");
      setNewPackage({ name: "", location: "", price: "", image_url: "", description: "", duration: "" });
      fetchPackages();
    }
  };

  const handleEditPackage = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("packages").update(newPackage).eq("id", editingPackage.id);
    if (error) {
      alert("Error updating package");
      console.error(error);
    } else {
      alert("Package updated successfully!");
      setEditingPackage(null);
      setNewPackage({ name: "", location: "", price: "", image_url: "", description: "", duration: "" });
      fetchPackages();
    }
  };

  const handleDeletePackage = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this package?");
    if (confirmDelete) {
      const { error } = await supabase.from("packages").delete().eq("id", id);
      if (error) {
        alert("Error deleting package");
      } else {
        alert("Package deleted successfully!");
        fetchPackages();
      }
    }
  };

  const startEditHotel = (hotel) => {
    setEditingHotel(hotel);
    setNewHotel({
      name: hotel.name,
      location: hotel.location,
      price: hotel.price,
      image_url: hotel.image_url,
      description: hotel.description || "",
    });
  };

  const startEditPackage = (pkg) => {
    setEditingPackage(pkg);
    setNewPackage({
      name: pkg.name,
      location: pkg.location,
      price: pkg.price,
      image_url: pkg.image_url,
      description: pkg.description || "",
      duration: pkg.duration,
    });
  };

  const cancelEdit = () => {
    setEditingHotel(null);
    setEditingPackage(null);
    setNewHotel({ name: "", location: "", price: "", image_url: "", description: "" });
    setNewPackage({ name: "", location: "", price: "", image_url: "", description: "", duration: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-700">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex mb-6 border-b">
          {["hotels", "packages", "bookings", "subscribers"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 capitalize ${activeTab === tab ? "border-b-2 border-green-600 text-green-600" : "text-gray-600"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Hotels Tab */}
        {activeTab === "hotels" && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {editingHotel ? "Edit Hotel" : "Add New Hotel"}
              </h2>
              <form
                onSubmit={editingHotel ? handleEditHotel : handleAddHotel}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <input
                  type="text"
                  placeholder="Hotel Name"
                  value={newHotel.name}
                  onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
                  className="border border-gray-300 p-2 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={newHotel.location}
                  onChange={(e) => setNewHotel({ ...newHotel, location: e.target.value })}
                  className="border border-gray-300 p-2 rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={newHotel.price}
                  onChange={(e) => setNewHotel({ ...newHotel, price: e.target.value })}
                  className="border border-gray-300 p-2 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newHotel.image_url}
                  onChange={(e) => setNewHotel({ ...newHotel, image_url: e.target.value })}
                  className="border border-gray-300 p-2 rounded"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={newHotel.description}
                  onChange={(e) => setNewHotel({ ...newHotel, description: e.target.value })}
                  className="border border-gray-300 p-2 rounded md:col-span-2"
                  rows="3"
                />
                <div className="md:col-span-2 flex gap-2">
                  <button
                    type="submit"
                    className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                  >
                    {editingHotel ? "Update Hotel" : "Add Hotel"}
                  </button>
                  {editingHotel && (
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">All Hotels</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead className="bg-green-600 text-white">
                    <tr>
                      <th className="border p-2">Name</th>
                      <th className="border p-2">Location</th>
                      <th className="border p-2">Price</th>
                      <th className="border p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hotels.map((hotel) => (
                      <tr key={hotel.id}>
                        <td className="border p-2">{hotel.name}</td>
                        <td className="border p-2">{hotel.location}</td>
                        <td className="border p-2">${hotel.price}</td>
                        <td className="border p-2 text-center space-x-2">
                          <button
                            onClick={() => startEditHotel(hotel)}
                            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteHotel(hotel.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Packages Tab */}
        {activeTab === "packages" && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {editingPackage ? "Edit Package" : "Add New Package"}
              </h2>
              <form
                onSubmit={editingPackage ? handleEditPackage : handleAddPackage}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <input
                  type="text"
                  placeholder="Package Name"
                  value={newPackage.name}
                  onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                  className="border border-gray-300 p-2 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={newPackage.location}
                  onChange={(e) => setNewPackage({ ...newPackage, location: e.target.value })}
                  className="border border-gray-300 p-2 rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={newPackage.price}
                  onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
                  className="border border-gray-300 p-2 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={newPackage.duration}
                  onChange={(e) => setNewPackage({ ...newPackage, duration: e.target.value })}
                  className="border border-gray-300 p-2 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newPackage.image_url}
                  onChange={(e) => setNewPackage({ ...newPackage, image_url: e.target.value })}
                  className="border border-gray-300 p-2 rounded"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={newPackage.description}
                  onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
                  className="border border-gray-300 p-2 rounded md:col-span-2"
                  rows="3"
                />
                <div className="md:col-span-2 flex gap-2">
                  <button
                    type="submit"
                    className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                  >
                    {editingPackage ? "Update Package" : "Add Package"}
                  </button>
                  {editingPackage && (
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">All Packages</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead className="bg-green-600 text-white">
                    <tr>
                      <th className="border p-2">Name</th>
                      <th className="border p-2">Location</th>
                      <th className="border p-2">Price</th>
                      <th className="border p-2">Duration</th>
                      <th className="border p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packages.map((pkg) => (
                      <tr key={pkg.id}>
                        <td className="border p-2">{pkg.name}</td>
                        <td className="border p-2">{pkg.location}</td>
                        <td className="border p-2">${pkg.price}</td>
                        <td className="border p-2">{pkg.duration}</td>
                        <td className="border p-2 text-center space-x-2">
                          <button
                            onClick={() => startEditPackage(pkg)}
                            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeletePackage(pkg.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Hotel Bookings</h2>
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse border border-gray-200">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Email</th>
                    <th className="border p-2">Hotel</th>
                    <th className="border p-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id}>
                      <td className="border p-2">{b.name}</td>
                      <td className="border p-2">{b.email}</td>
                      <td className="border p-2">{b.hotel_name}</td>
                      <td className="border p-2">{b.created_at?.slice(0, 10)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Package Bookings</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Email</th>
                    <th className="border p-2">Package</th>
                    <th className="border p-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {packageBookings.map((b) => (
                    <tr key={b.id}>
                      <td className="border p-2">{b.name}</td>
                      <td className="border p-2">{b.email}</td>
                      <td className="border p-2">{b.package_name}</td>
                      <td className="border p-2">{b.created_at?.slice(0, 10)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Subscribers Tab */}
        {activeTab === "subscribers" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Newsletter Subscribers</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="border p-2">Email</th>
                    <th className="border p-2">Subscribed Date</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((sub) => (
                    <tr key={sub.id}>
                      <td className="border p-2">{sub.email}</td>
                      <td className="border p-2">{sub.created_at?.slice(0, 10)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
