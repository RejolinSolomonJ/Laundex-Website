const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Service = require('../models/Service');
const auth = require('../middleware/authMiddleware');
const sendEmail = require('../services/emailService');
const User = require('../models/User');
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

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
                sendEmail(
                    user.email,
                    'Order Confirmation - Laundex',
                    `Hi ${user.name},\n\nYour order #${order._id} has been placed successfully. We will pick it up on ${new Date(pickupDate).toLocaleDateString()}.\n\nTotal Amount: $${service.price}\n\nThank you,\nLaundex Team`,
                    `<h1>Order Confirmation</h1><p>Hi ${user.name},</p><p>Your order <strong>#${order._id}</strong> has been placed successfully.</p><p><strong>Pickup Date:</strong> ${new Date(pickupDate).toLocaleDateString()}</p><p><strong>Total Amount:</strong> $${service.price}</p><p>Thank you,<br>Laundex Team</p>`
                ).catch(err => console.error('Background Email Error:', err));
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

// Create Razorpay Order
router.post('/:id/create-pay-order', auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ msg: 'Order not found' });

        const options = {
            amount: order.totalAmount * 100, // amount in the smallest currency unit (paise)
            currency: "INR",
            receipt: `receipt_order_${order._id}`,
        };

        const rzpOrder = await razorpay.orders.create(options);
        res.json(rzpOrder);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating Razorpay order');
    }
});

// Verify Payment
router.post('/:id/verify-payment', auth, async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    try {
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            const order = await Order.findById(req.params.id);
            if (!order) return res.status(404).json({ msg: 'Order not found' });

            order.paymentStatus = 'paid';
            order.paymentId = razorpay_payment_id;
            await order.save();

            res.json({ status: 'success', order });
        } else {
            res.status(400).json({ status: 'failure', msg: 'Invalid signature' });
        }
    } catch (err) {
        console.error(err);
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

        const io = req.app.get('io');
        io.emit('orderStatusUpdated', { orderId: order._id, status, user: order.user });

        try {
            const user = await User.findById(order.user);
            if (user) {
                // Email Notification
                sendEmail(
                    user.email,
                    'Order Status Update - Laundex',
                    `Hi ${user.name},\n\nYour order #${order._id} is now ${status}.\n\nThank you,\nLaundex Team`,
                    `<h1>Order Status Update</h1><p>Hi ${user.name},</p><p>Your order <strong>#${order._id}</strong> is now <strong>${status}</strong>.</p><p>Thank you,<br>Laundex Team</p>`
                ).catch(err => console.error('Background Email Error:', err));
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

// Process Payment (Old Mock - kept for compatibility if needed, but recommended to use verify-payment)
router.post('/:id/pay', auth, async (req, res) => {
    try {
        let order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ msg: 'Order not found' });

        order.paymentStatus = 'paid';
        order.paymentId = `PAY_${Date.now()}`; 
        await order.save();

        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

