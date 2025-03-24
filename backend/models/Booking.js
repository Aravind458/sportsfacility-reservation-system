const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    facility: { type: mongoose.Schema.Types.ObjectId, ref: 'Facility', required: true },
    slot: { type: String, required: true },
    status: { type: String, default: 'confirmed' },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);