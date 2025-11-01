import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const BookingModal = ({ hotel, onClose }) => {
  const [form, setForm] = useState({ name: "", email: "", date: "" });

  if (!hotel) return null; // ✅ prevents undefined access

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from("bookings").insert([
      {
        hotel_id: hotel.id,
        name: form.name,
        email: form.email,
        date: form.date,
      },
    ]);

    if (error) {
      console.error("Booking error:", error);
      alert("Failed to book. Please try again.");
    } else {
      alert("Booking successful!");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">
          Book {hotel ? hotel.name : "Hotel"}
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

export default BookingModal;
