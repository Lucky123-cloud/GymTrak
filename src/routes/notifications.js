// src/routes/notification.js
const express = require('express');
const Notification = require('../models/Notification');

const router = express.Router();

// Create Notification
router.post('/', async (req, res) => {
    const { user, message } = req.body;

    try {
        const notification = new Notification({ user, message });
        await notification.save();
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get Notifications for a User
router.get('/:userId', async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.params.userId });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
