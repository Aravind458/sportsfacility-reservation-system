import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const AdminDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [stats, setStats] = useState([]);
    const [error, setError] = useState('');
    const { role } = useAuthStore();

    useEffect(() => {
        if (role !== 'admin') return;
        const loadData = async () => {
            try {
                const bookingResponse = await fetch('https://sports-facility-reservation-system.onrender.com/api/bookings/all', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                const statsResponse = await fetch('https://sports-facility-reservation-system.onrender.com/api/bookings/stats', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                if (!bookingResponse.ok) throw new Error('Failed to fetch bookings');
                if (!statsResponse.ok) throw new Error('Failed to fetch stats');
                const bookingData = await bookingResponse.json();
                const statsData = await statsResponse.json();
                console.log('Admin Bookings (Frontend):', JSON.stringify(bookingData, null, 2));
                console.log('Admin Stats (Frontend):', JSON.stringify(statsData, null, 2));
                setBookings(bookingData);
                setStats(statsData);
            } catch (err) {
                setError('Error loading data: ' + err.message);
            }
        };
        loadData();
    }, [role]);

    if (role !== 'admin') return <Navigate to="/" />;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">All Bookings</h2>
                {bookings.length === 0 && !error ? (
                    <p className="text-gray-600">No bookings yet.</p>
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Facility</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slot</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {bookings.map((booking) => (
                                    <tr key={booking._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{booking.user?.name || 'Unknown'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{booking.facility?.name || 'Unknown'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{booking.slot}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                booking.status === 'confirmed'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-4">Facility Statistics</h2>
                {stats.length === 0 && !error ? (
                    <p className="text-gray-600">No facility stats available.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {stats.map((stat) => (
                            <div key={stat.name} className="bg-white p-6 rounded-lg shadow">
                                <h3 className="text-xl font-semibold mb-2">{stat.name}</h3>
                                <p>Total Slots: {stat.totalSlots}</p>
                                <p>Booked Slots: {stat.bookedSlots}</p>
                                <p>Available Slots: {stat.availableSlots}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;