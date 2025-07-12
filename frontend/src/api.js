const API_BASE_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
});

export const registerUser = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    return response.json();
};

export const loginUser = async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (data.token) localStorage.setItem('token', data.token);
    return data;
};

export const fetchFacilities = async () => {
    const response = await fetch(`${API_BASE_URL}/facilities`, {
        headers: getAuthHeaders()
    });
    return response.json();
};

export const createBooking = async (bookingData) => {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(bookingData),
    });
    return response.json();
};

export const fetchMyBookings = async () => {
    const response = await fetch(`${API_BASE_URL}/bookings/my-bookings`, {
        headers: getAuthHeaders()
    });
    return response.json();
};

export const fetchAllBookings = async () => {
    const response = await fetch(`${API_BASE_URL}/bookings/all`, {
        headers: getAuthHeaders()
    });
    return response.json();
};

export const fetchFacilityStats = async () => {
    const response = await fetch(`${API_BASE_URL}/bookings/stats`, {
        headers: getAuthHeaders()
    });
    return response.json();
};