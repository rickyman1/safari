import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function BookingModal({ hotel, onClose }) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    check_in: "",
    check_out: "",
    guests: 1,
  });

  if (!hotel) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("bookings").insert([{
      hotel_id: hotel.id,
      full_name: formData.full_name,
      email: formData.email,
      check_in: formData.check_in,
      check_out: formData.check_out,
      guests: Number(formData.guests)
    }]);
    if (error) {
      console.error(error);
      alert("Booking failed");
    } else {
      alert("Booking successful!");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Book {hotel.name}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Full Name" value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} className="w-full p-2 border rounded mb-2" required />
          <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-2 border rounded mb-2" required />
          <input type="date" placeholder="Check-in" value={formData.check_in} onChange={e => setFormData({...formData, check_in: e.target.value})} className="w-full p-2 border rounded mb-2" required />
          <input type="date" placeholder="Check-out" value={formData.check_out} onChange={e => setFormData({...formData, check_out: e.target.value})} className="w-full p-2 border rounded mb-2" required />
          <input type="number" placeholder="Guests" value={formData.guests} onChange={e => setFormData({...formData, guests: e.target.value})} className="w-full p-2 border rounded mb-2" min="1" required />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Book</button>
          </div>
        </form>
      </div>
    </div>
  );
}
