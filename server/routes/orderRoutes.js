const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Service = require('../models/Service');
const auth = require('../middleware/authMiddleware');
const sendEmail = require('../services/emailService');
const User = require('../models/User'); // Ensure User model is imported for phone number lookup

// Create Order (User)
router.post('/', auth, async (req, res) => {
    const { serviceId, pickupDate, address } = req.body;

    try {
        const service = await Service.findById(serviceId);
        if (!service) return res.status(404).json({ msg: 'Service not found' });

        const pickup = new Date(pickupDate);
        const delivery = new Date(pickup);
        delivery.setDate(delivery.getDate() + 2); // Default 2 days processing

        const newOrder = new Order({
            user: req.user.id,
            service: serviceId,
            pickupDate,
            deliveryDate: delivery,
            address,
            totalAmount: service.price // Basic calculation for now
        });

        const order = await newOrder.save();

        // Send Order Confirmation Email
        try {
            const user = await User.findById(req.user.id);
            if (user) {
                await sendEmail(
                    user.email,
                    'Order Confirmation - QuickWash Pro',
                    `Hi ${user.name},\n\nYour order #${order._id} has been placed successfully. We will pick it up on ${new Date(pickupDate).toLocaleDateString()}.\n\nTotal Amount: $${service.price}\n\nThank you,\nQuickWash Team`,
                    `<h1>Order Confirmation</h1><p>Hi ${user.name},</p><p>Your order <strong>#${order._id}</strong> has been placed successfully.</p><p><strong>Pickup Date:</strong> ${new Date(pickupDate).toLocaleDateString()}</p><p><strong>Total Amount:</strong> $${service.price}</p><p>Thank you,<br>QuickWash Team</p>`
                );
            }
        } catch (notifyError) {
            console.error('Error sending order confirmation notification:', notifyError);
        }

        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get My Orders (User)
router.get('/my-orders', auth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('service').sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get Assigned Orders (Worker)
router.get('/assigned', auth, async (req, res) => {
    try {
        // Show all orders for now to demonstrate functionality
        const allOrders = await Order.find().populate('service').populate('user', 'name address phone').sort({ createdAt: -1 });
        res.json(allOrders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update Order Status (Worker)
router.put('/:id/status', auth, async (req, res) => {
    const { status } = req.body;
    try {
        let order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ msg: 'Order not found' });

        order.status = status;
        await order.save();

        // Emit event
        const io = req.app.get('io');
        io.emit('orderStatusUpdated', { orderId: order._id, status, user: order.user });

        // Send Notifications
        try {
            const user = await User.findById(order.user);
            if (user) {
                // Email Notification
                await sendEmail(
                    user.email,
                    'Order Status Update - QuickWash Pro',
                    `Hi ${user.name},\n\nYour order #${order._id} is now ${status}.\n\nThank you,\nQuickWash Team`,
                    `<h1>Order Status Update</h1><p>Hi ${user.name},</p><p>Your order <strong>#${order._id}</strong> is now <strong>${status}</strong>.</p><p>Thank you,<br>QuickWash Team</p>`
                );
            }
        } catch (notifyError) {
            console.error('Error sending status update notification:', notifyError);
        }

        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Process Payment (Mock)
router.post('/:id/pay', auth, async (req, res) => {
    try {
        let order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ msg: 'Order not found' });

        // Mock Payment Processing
        order.paymentStatus = 'paid';
        order.paymentId = `PAY_${Date.now()}`; // Mock ID
        await order.save();

        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
