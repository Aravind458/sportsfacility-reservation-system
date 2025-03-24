const express = require('express');
const router = express.Router();
const Facility = require('../models/Facility');
const { auth, adminOnly } = require('../middleware/auth');

router.post('/', auth, adminOnly, async (req, res) => {
    try {
        const { name, location, slots, price, image } = req.body;
        const facility = new Facility({ name, location, slots, price, image });
        await facility.save();
        res.status(201).json(facility);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const facilities = await Facility.find();
        if (!facilities.length) return res.json([]);
        res.json(facilities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;