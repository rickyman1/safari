import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function AdminDashboard() {
  const [hotels, setHotels] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newHotel, setNewHotel] = useState({ name: "", location: "", price: "", image_url: "", description: "" });

  useEffect(() => {
    fetchHotels();
    fetchBookings();
  }, []);

  const fetchHotels = async () => {
    const { data, error } = await supabase.from("hotels").select("*");
    if (error) console.error(error);
    else setHotels(data || []);
  };

  const fetchBookings = async () => {
    const { data, error } = await supabase.from("bookings").select("*");
    if (error) console.error(error);
    else setBookings(data || []);
  };

  const handleAddHotel = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("hotels").insert([newHotel]);
    if (error) console.error(error);
    else {
      setNewHotel({ name: "", location: "", price: "", image_url: "", description: "" });
      fetchHotels();
    }
  };

  const handleDeleteHotel = async (id) => {
    const { error } = await supabase.from("hotels").delete().eq("id", id);
    if (!error) fetchHotels();
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    window.location.href = "/";
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Hotel</h2>
        <form onSubmit={handleAddHotel} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Name" value={newHotel.name} onChange={e => setNewHotel({...newHotel, name: e.target.value})} className="p-2 border rounded" required />
          <input type="text" placeholder="Location" value={newHotel.location} onChange={e => setNewHotel({...newHotel, location: e.target.value})} className="p-2 border rounded" required />
          <input type="number" placeholder="Price" value={newHotel.price} onChange={e => setNewHotel({...newHotel, price: e.target.value})} className="p-2 border rounded" required />
          <input type="text" placeholder="Image URL" value={newHotel.image_url} onChange={e => setNewHotel({...newHotel, image_url: e.target.value})} className="p-2 border rounded" required />
          <textarea placeholder="Description" value={newHotel.description} onChange={e => setNewHotel({...newHotel, description: e.target.value})} className="p-2 border rounded md:col-span-2" />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Hotel</button>
        </form>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Hotels</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Name</th>
              <th className="p-2">Location</th>
              <th className="p-2">Price</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map(h => (
              <tr key={h.id}>
                <td className="p-2">{h.name}</td>
                <td className="p-2">{h.location}</td>
                <td className="p-2">KSh {h.price}</td>
                <td className="p-2">
                  <button onClick={() => handleDeleteHotel(h.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Bookings</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Check-in</th>
              <th className="p-2">Check-out</th>
              <th className="p-2">Guests</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id}>
                <td className="p-2">{b.full_name}</td>
                <td className="p-2">{b.email}</td>
                <td className="p-2">{b.check_in}</td>
                <td className="p-2">{b.check_out}</td>
                <td className="p-2">{b.guests}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
