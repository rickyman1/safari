// src/components/Destinations.jsx
const destinations = [
  { name: "Maasai Mara", image: "https://source.unsplash.com/600x400/?maasai-mara" },
  { name: "Diani Beach", image: "https://source.unsplash.com/600x400/?diani-beach" },
  { name: "Mount Kenya", image: "https://source.unsplash.com/600x400/?mount-kenya" },
  { name: "Lake Nakuru", image: "https://source.unsplash.com/600x400/?lake-nakuru" },
];

export default function Destinations() {
  return (
    <section id="destinations" className="py-20 bg-gray-50">
      <h2 className="text-4xl font-bold text-center text-emerald-700 mb-10">
        Top Tourist Destinations
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
        {destinations.map((place) => (
          <div
            key={place.name}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform"
          >
            <img src={place.image} alt={place.name} className="w-full h-48 object-cover" />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">{place.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
