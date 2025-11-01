import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-100 via-emerald-200 to-green-300 text-center px-6">
      <motion.h1
        className="text-5xl font-bold text-emerald-700 mb-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Discover Kenya Like Never Before 
      </motion.h1>

      <motion.p
        className="text-gray-700 text-lg max-w-2xl mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Explore breathtaking destinations, luxury hotels, and curated travel packages across Kenya.
      </motion.p>

      <motion.a
        href="#destinations"
        className="bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-emerald-700 transition"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        Start Exploring
      </motion.a>
    </section>
  );
}
