import { MapPin } from 'lucide-react';

const locations = [
  {
    id: 1,
    name: 'Downtown Sports Center',
    address: '123 Main Street, Downtown',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  },
  {
    id: 2,
    name: 'Westside Fitness Complex',
    address: '456 West Avenue, Westside',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  },
  {
    id: 3,
    name: 'Eastside Sports Hub',
    address: '789 East Boulevard, Eastside',
    image: 'https://images.unsplash.com/photo-1516941064643-74aacd84843c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  },
];

const LocationSelector = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Locations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {locations.map((location) => (
            <div key={location.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={location.image}
                alt={location.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{location.name}</h3>
                <div className="flex items-center text-gray-600">
                  <MapPin size={20} className="mr-2" />
                  <p>{location.address}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationSelector;