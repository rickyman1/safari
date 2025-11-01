import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { data, error } = await supabase
        .from("subscribers")
        .insert([{ email }]);

      if (error) {
        if (error.code === "23505") { // Unique constraint violation
          setMessage("This email is already subscribed!");
        } else {
          throw error;
        }
      } else {
        setMessage("Thank you for subscribing! We'll send you exclusive deals.");
        setEmail("");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      setMessage("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="subscribe"
      className="py-20 bg-gradient-to-r from-emerald-700 to-green-500 text-white text-center px-6"
    >
      <h2 className="text-3xl font-bold mb-4">Ready for your next adventure?</h2>
      <p className="mb-6 text-lg">
        Subscribe to receive exclusive travel deals, updates, and insider tips from Safari Adventures Kenya.
      </p>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded-md flex-grow text-gray-800 outline-none"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-white text-emerald-700 px-6 py-3 rounded-md font-semibold hover:bg-emerald-100 transition disabled:opacity-50"
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      {message && (
        <p className={`mt-4 text-sm ${message.includes("Thank you") ? "text-green-200" : "text-yellow-200"}`}>
          {message}
        </p>
      )}
    </section>
  );
}

