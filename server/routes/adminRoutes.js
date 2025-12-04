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
            .populate('user', 'name')
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
            .populate('user', 'name')
            .populate('worker', 'name')
            .populate('service', 'name price');

        // Emit event
        const io = req.app.get('io');
        io.emit('orderAssigned', { orderId: order._id, workerId, user: order.user });

        // Emit SMS to User
        if (order.user && order.user.phone) {
            io.emit('sendSMS', {
                to: order.user.phone,
                message: `QuickWash Pro: A worker has been assigned to your order.`
            });
        }

        // Emit SMS to Worker
        const worker = await User.findById(workerId);
        if (worker && worker.phone) {
            io.emit('sendSMS', {
                to: worker.phone,
                message: `QuickWash Pro: You have been assigned a new order.`
            });
        }

        res.json(updatedOrder);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
