const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Order = require('../models/Order');
const auth = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleMiddleware');

// Get all users and workers
router.get('/users', [auth, checkRole(['admin'])], async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get all orders (Admin view)
router.get('/orders', [auth, checkRole(['admin'])], async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name phone')
            .populate('worker', 'name')
            .populate('service', 'name price')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Assign Worker to Order
router.put('/assign', [auth, checkRole(['admin'])], async (req, res) => {
    const { orderId, workerId } = req.body;
    try {
        let order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ msg: 'Order not found' });

        order.worker = workerId;
        order.status = 'pickup_assigned';
        await order.save();

        // Return updated order with populated fields
        const updatedOrder = await Order.findById(orderId)
            .populate('user', 'name phone')
            .populate('worker', 'name')
            .populate('service', 'name price');

        // Emit event
        const io = req.app.get('io');
        io.emit('orderAssigned', { orderId: order._id, workerId, user: order.user });

        // Emit SMS to User
        if (order.user && order.user.phone) {
            io.emit('sendSMS', {
                to: order.user.phone,
                message: `Laundex: A worker has been assigned to your order.`
            });
        }

        // Emit SMS to Worker
        const worker = await User.findById(workerId);
        if (worker && worker.phone) {
            io.emit('sendSMS', {
                to: worker.phone,
                message: `Laundex: You have been assigned a new order.`
            });
        }

        res.json(updatedOrder);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get Admin Stats
router.get('/stats', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });

        const totalOrders = await Order.countDocuments();

        // Calculate total revenue
        const revenueAgg = await Order.aggregate([
            { $group: { _id: null, total: { $sum: "$totalAmount" } } }
        ]);
        const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

        // Calculate service usage
        const serviceUsage = await Order.aggregate([
            {
                $lookup: {
                    from: "services",
                    localField: "service",
                    foreignField: "_id",
                    as: "serviceDetails"
                }
            },
            { $unwind: "$serviceDetails" },
            {
                $group: {
                    _id: "$serviceDetails.name",
                    count: { $sum: 1 },
                    color: { $first: "$serviceDetails.category" } // Just using category as a proxy for color for now
                }
            },
            { $sort: { count: -1 } }
        ]);

        // Map categories to colors if needed, or send raw data
        const stats = {
            totalOrders,
            totalRevenue,
            serviceUsage
        };

        res.json(stats);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
