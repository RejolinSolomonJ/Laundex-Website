const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const sendEmail = require('../services/emailService');

// Register
router.post('/register', async (req, res) => {
    const { name, email, password, phone, role, address } = req.body;

    // Validation
    if (!email.endsWith('@gmail.com')) {
        return res.status(400).json({ msg: 'Please use a valid Gmail address (@gmail.com)' });
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ msg: 'Password must be at least 8 characters long and include at least one number and one special character.' });
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            role,
            address
        });

        await user.save();

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        // Send Welcome Email
        try {
            await sendEmail(
                email,
                'Welcome to Laundex',
                `Hi ${name},\n\nThank you for registering with Laundex! We are excited to have you on board.\n\nBest Regards,\nLaundex Team`,
                `<h1>Welcome to Laundex!</h1><p>Hi ${name},</p><p>Thank you for registering with Laundex! We are excited to have you on board.</p><p>Best Regards,<br>Laundex Team</p>`
            );
        } catch (emailError) {
            console.error('Error sending welcome email:', emailError);
            // Continue even if email fails
        }

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1d' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1d' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
