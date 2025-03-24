const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    slots: [{ type: String }],
    price: { type: Number, required: true },
    image: { type: String, required: true }, // Added image field
}, { timestamps: true });

module.exports = mongoose.model('Facility', facilitySchema);