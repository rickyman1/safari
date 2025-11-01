// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-emerald-800 text-white py-8">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="font-bold text-xl mb-2">Safari Adventures Kenya</h3>
        <p className="text-sm text-gray-200 mb-4">
          © {new Date().getFullYear(2025)} All Rights Reserved | Kenya
        </p>
        <div className="flex justify-center space-x-6">
          <a href="#" className="hover:text-green-300">Facebook</a>
          <a href="#" className="hover:text-green-300">Instagram</a>
          <a href="#" className="hover:text-green-300">Twitter</a>
        </div>
      </div>
    </footer>
  );
}
