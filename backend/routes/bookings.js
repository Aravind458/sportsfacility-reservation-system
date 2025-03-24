const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Facility = require('../models/Facility');
const User = require('../models/User');
const { auth, adminOnly } = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
    try {
        const { facility, slot } = req.body;
        const booking = new Booking({ user: req.user.userId, facility, slot });
        await booking.save();
        const populatedBooking = await Booking.findById(booking._id)
            .populate('user', 'name email') // Explicitly populate user
            .populate('facility', 'name image'); // Explicitly populate facility
        console.log('New Booking (Populated):', JSON.stringify(populatedBooking, null, 2));
        res.status(201).json(populatedBooking);
    } catch (error) {
        console.error('Booking Creation Error:', error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/my-bookings', auth, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.userId })
            .populate('user', 'name email')
            .populate('facility', 'name image');
        console.log('My Bookings (Populated):', JSON.stringify(bookings, null, 2));
        if (!bookings.length) {
            console.log('No bookings found for user:', req.user.userId);
        }
        res.json(bookings || []);
    } catch (error) {
        console.error('My Bookings Error:', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/all', auth, adminOnly, async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('user', 'name email')
            .populate('facility', 'name image');
        console.log('All Bookings (Populated):', JSON.stringify(bookings, null, 2));
        if (!bookings.length) {
            console.log('No bookings found in database');
        }
        res.json(bookings || []);
    } catch (error) {
        console.error('All Bookings Error:', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/stats', auth, adminOnly, async (req, res) => {
    try {
        const facilities = await Facility.find();
        const bookings = await Booking.find({ status: 'confirmed' });
        const stats = facilities.map(facility => {
            const bookedSlots = bookings.filter(b => 
                b.facility.toString() === facility._id.toString()
            ).map(b => b.slot);
            const availableSlots = facility.slots.filter(slot => 
                !bookedSlots.includes(slot)
            );
            return {
                name: facility.name,
                totalSlots: facility.slots.length,
                bookedSlots: bookedSlots.length,
                availableSlots: availableSlots.length
            };
        });
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;