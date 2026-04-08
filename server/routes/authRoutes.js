const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const sendEmail = require('../services/emailService');

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

// Google Login
router.post('/google', async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const { name, email, picture, sub: googleId } = ticket.getPayload();

        let user = await User.findOne({ email });

        if (user) {
            // User exists, update googleId if missing
            if (!user.googleId) {
                user.googleId = googleId;
                if (!user.avatar) user.avatar = picture;
                await user.save();
            }
        } else {
            // New user, create account
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(email + process.env.JWT_SECRET, salt); // Dummy password

            user = new User({
                name,
                email,
                password: hashedPassword,
                googleId,
                avatar: picture,
                role: 'user',
                phone: '' // Phone is optional in schema now
            });

            await user.save();

            // Send Welcome Email (Optional)
            try {
                await sendEmail(
                    email,
                    'Welcome to Laundex',
                    `Hi ${name},\n\nThank you for signing up with Laundex via Google!`,
                    `<h1>Welcome to Laundex!</h1><p>Hi ${name},</p><p>Thank you for signing up with Laundex via Google!</p>`
                );
            } catch (emailError) {
                console.error('Error sending welcome email:', emailError);
            }
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
                res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar } });
            }
        );

    } catch (err) {
        console.error('Google Auth Error:', err);
        res.status(400).json({ msg: 'Google Sign-In Failed' });
    }
});

module.exports = router;
