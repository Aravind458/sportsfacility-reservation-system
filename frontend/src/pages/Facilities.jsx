import { useState, useEffect } from 'react';
import FacilityCard from '../components/FacilityCard';
import BookingModal from '../components/BookingModal';
import useAuthStore from '../store/authStore';

const Facilities = () => {
    const [facilities, setFacilities] = useState([]);
    const [selectedFacility, setSelectedFacility] = useState(null);
    const [error, setError] = useState('');
    const { role } = useAuthStore();

    useEffect(() => {
        const loadFacilities = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/facilities', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                if (!response.ok) throw new Error('Failed to fetch facilities');
                const data = await response.json();
                console.log('Facilities:', data); // Debug
                setFacilities(data);
            } catch (err) {
                setError('Error loading facilities: ' + err.message);
            }
        };
        loadFacilities();
    }, []);

    const handleBook = (facility) => {
        if (role === 'admin') {
            alert('Admins cannot book facilities.');
            return;
        }
        setSelectedFacility(facility);
    };

    const handleConfirmBooking = async (bookingDetails) => {
        try {
            const bookingData = {
                facility: bookingDetails.facility.id,
                slot: `${bookingDetails.time} - ${parseInt(bookingDetails.time.split(':')[0]) + parseInt(bookingDetails.duration)}:00`,
            };
            const response = await fetch('http://localhost:5000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(bookingData),
            });
            if (!response.ok) throw new Error('Booking failed');
            const data = await response.json();
            console.log('Booking Response:', data); // Debug
            alert('Booking confirmed!');
            setSelectedFacility(null);
        } catch (error) {
            alert('Booking failed: ' + error.message);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Available Facilities</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {facilities.length === 0 && !error ? (
                <p className="text-gray-600">No facilities available.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {facilities.map((facility) => (
                        <FacilityCard
                            key={facility._id}
                            facility={{
                                id: facility._id,
                                name: facility.name,
                                description: facility.location,
                                pricePerHour: facility.price,
                                hours: facility.slots.join(', '),
                                image: facility.image // From MongoDB
                            }}
                            onBook={handleBook}
                        />
                    ))}
                </div>
            )}
            {selectedFacility && (
                <BookingModal
                    facility={selectedFacility}
                    onClose={() => setSelectedFacility(null)}
                    onConfirm={handleConfirmBooking}
                />
            )}
        </div>
    );
};

export default Facilities;