// src/routes/admin.js
const express = require('express');
const { check, validationResult } = require('express-validator');
const adminAuth = require('../middleware/adminAuth');
const User = require('../models/User');
const Notification = require('../models/Notification');

const router = express.Router();

router.post(
    '/clients/:clientId/notify',
    adminAuth,
    [
        check('message', 'Message is required').not().isEmpty(),
        check('type', 'Invalid notification type').isIn(['workout', 'payment', 'hydration', 'general', 'info', 'alert', 'reminder']), // Added more types for flexibility
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { message, type } = req.body;

        try {
            const client = await User.findById(req.params.clientId);
            if (!client || client.role !== 'client') {
                return res.status(404).json({ message: 'Client not found or is not a client' });
            }

            const notification = new Notification({
                user: client._id,
                type,
                message,
            });

            await notification.save();

            res.json({ message: 'Notification sent successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
);


// Get all notifications for a specific client
router.get('/clients/:clientId/notifications', adminAuth, async (req, res) => {
    try {
        const client = await User.findById(req.params.clientId);
        if (!client || client.role !== 'client') {
            return res.status(404).json({ message: 'Client not found or is not a client' });
        }

        const notifications = await Notification.find({ user: client._id });

        if (!notifications.length) {
            return res.status(404).json({ message: 'No notifications found for this client' });
        }

        res.json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Search and filter users (admin-only access)
router.get('/users', adminAuth, async (req, res) => {
    const { name, email, role } = req.query;

    try {
        let query = {};

        if (name) {
            query.name = { $regex: name, $options: 'i' };
        }
        if (email) {
            query.email = { $regex: email, $options: 'i' };
        }
        if (role) {
            query.role = role;
        }

        const users = await User.find(query).select('-password');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new user (POST request)
router.post('/users', adminAuth, async (req, res) => {
    const { name, email, role } = req.body;

    try {
        const newUser = new User({ name, email, role });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
