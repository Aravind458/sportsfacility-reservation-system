import { useState, useEffect } from 'react';
import useAuthStore from '../store/authStore';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    const { role } = useAuthStore();

    useEffect(() => {
        const loadBookings = async () => {
            try {
                const endpoint = role === 'admin' ? '/api/bookings/all' : '/api/bookings/my-bookings';
                const response = await fetch(`http://localhost:5000${endpoint}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to fetch bookings');
                }
                const data = await response.json();
                console.log(`${role} Bookings (Frontend):`, JSON.stringify(data, null, 2));
                setBookings(data);
            } catch (err) {
                setError('Error loading bookings: ' + err.message);
            }
        };
        loadBookings();
    }, [role]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">{role === 'admin' ? 'All Bookings' : 'My Bookings'}</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {bookings.length === 0 && !error ? (
                <p className="text-gray-600">No bookings found.</p>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                {role === 'admin' && (
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                )}
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Facility</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slot</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {bookings.map((booking) => (
                                <tr key={booking._id}>
                                    {role === 'admin' && (
                                        <td className="px-6 py-4 whitespace-nowrap">{booking.user?.name || 'Unknown'}</td>
                                    )}
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
    );
};

export default Bookings;