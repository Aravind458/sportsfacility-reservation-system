import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const Analytics = () => {
  // Sample data - replace with actual data from your backend
  const bookingData = [
    { name: 'Jan', bookings: 65 },
    { name: 'Feb', bookings: 59 },
    { name: 'Mar', bookings: 80 },
    { name: 'Apr', bookings: 81 },
    { name: 'May', bookings: 56 },
    { name: 'Jun', bookings: 55 },
    { name: 'July', bookings: 55 },
    { name: 'Aug', bookings: 55 },
    { name: 'Sep', bookings: 55 },
    { name: 'Oct', bookings: 55 },
    { name: 'Nov', bookings: 55 },
    { name: 'Dec', bookings: 55 },
  ];

  const facilityData = [
    { name: 'Cricket Ground', usage: 95 },
    { name: 'Hockey Ground', usage: 75 },
    { name: 'Multi-Purpose Hall', usage: 60 },
    { name: 'Ring Field', usage: 90 },
    { name: 'Fitness Center', usage: 95 },
    { name: 'Badminton Court', usage: 65 },
    { name: 'Table Tennis Room', usage: 50 },
    { name: 'Tennis Court', usage: 75 },
    { name: 'Volleyball Court ', usage: 90 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Analytics Dashboard</h1>
      
      {/* Charts Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Monthly Bookings Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Monthly Bookings</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="bookings" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Facility Usage Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Facility Usage</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={facilityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="usage" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Key Metrics Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {[
          { label: "Total Bookings", value: "1,234", color: "text-blue-600" },
          { label: "Active Users", value: "856", color: "text-green-600" },
          { label: "Revenue", value: "₹12,345", color: "text-purple-600" },
          { label: "Facilities", value: "9", color: "text-orange-600" },
        ].map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-700">{item.label}</h3>
            <p className={`text-3xl font-bold ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Analytics;
