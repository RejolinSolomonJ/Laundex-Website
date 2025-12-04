const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const auth = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleMiddleware');

// Get all services (Public or Authenticated)
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Add a service (Admin only)
router.post('/', [auth, checkRole(['admin'])], async (req, res) => {
    const { name, description, price, image, category } = req.body;

    try {
        const newService = new Service({
            name,
            description,
            price,
            image,
            category
        });

        const service = await newService.save();
        res.json(service);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Seed default services (Dev only - Public for now for ease)
router.post('/seed', async (req, res) => {
    try {
        const count = await Service.countDocuments();
        if (count > 0) return res.status(400).json({ msg: 'Services already seeded' });

        const services = [
            { name: 'Wash & Fold', description: 'Everyday laundry, washed and folded.', price: 50, category: 'wash' },
            { name: 'Dry Cleaning', description: 'Delicate fabrics, chemical cleaning.', price: 150, category: 'dryclean' },
            { name: 'Ironing Only', description: 'Professional pressing for shirts/pants.', price: 30, category: 'iron' },
            { name: 'Premium Wash', description: 'High-quality wash with premium detergents.', price: 80, category: 'premium' }
        ];

        await Service.insertMany(services);
        res.json({ msg: 'Services seeded successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
