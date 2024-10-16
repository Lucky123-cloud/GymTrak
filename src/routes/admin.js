// src/routes/admin.js
const express = require('express');
const { check, validationResult } = require('express-validator');
const adminAuth = require('../middleware/adminAuth');  // Assuming you have this middleware for admin authentication
const User = require('../models/User');
const Notification = require('../models/Notification');  // Assuming you have a Notification model

const router = express.Router();

// Other admin routes...

// Send Notification to a client
router.post('/clients/:clientId/notify', adminAuth, async (req, res) => {
    const { message, type } = req.body;

    try {
        // Find the client by their ID
        const client = await User.findById(req.params.clientId);
        if (!client || client.role !== 'client') {
            return res.status(404).json({ message: 'Client not found' });
        }

        // Create a new notification (assuming you have a Notification model)
        const notification = new Notification({
            userId: client._id,
            type,
            message,
        });

        // Save the notification
        await notification.save();

        res.json({ message: 'Notification sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
