const express = require('express');
const cors = require('cors'); // ✅ Declare only once
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173', // Local development
    'https://sportsfacility-reservation-system.vercel.app' // Vercel frontend
  ],
  credentials: true
}));


app.use(express.json());

app.use('/api/users', require('./routes/users'));
app.use('/api/facilities', require('./routes/facilities'));
app.use('/api/bookings', require('./routes/bookings'));

app.get('/', (req, res) => res.send('Sports Facility Reservation Backend Running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
