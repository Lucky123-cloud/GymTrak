const express = require('express');
const { check, validationResult } = require('express-validator');
const Notification = require('../models/Notification');
const User = require('../models/User'); // Import User model

const router = express.Router();

// Send general notification to all users
router.post('/send', [
    check('message', 'Message is required').not().isEmpty(),
    check('type', 'Notification type is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { message, type } = req.body;

    try {
        const allUsers = await User.find({});
        const notifications = allUsers.map(u => ({
            user: u._id,
            message,
            type
        }));

        await Notification.insertMany(notifications);
        return res.status(201).json({ message: 'General notifications sent to all users' });
    } catch (error) {
        console.error('Error sending general notifications:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Send workout notification to all users
router.post('/workout', [
    check('message', 'Message is required').not().isEmpty(),
    check('type', 'Notification type is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { message, type } = req.body;

    try {
        const allUsers = await User.find({});
        const notifications = allUsers.map(u => ({
            user: u._id,
            message,
            type
        }));

        await Notification.insertMany(notifications);
        return res.status(201).json({ message: 'Workout notifications sent to all users' });
    } catch (error) {
        console.error('Error sending workout notifications:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create Notification for individual users
router.post('/send/user', [
    check('user', 'User ID is required').not().isEmpty(),
    check('message', 'Message is required').not().isEmpty(),
    check('type', 'Notification type is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { user, message, type } = req.body;

    try {
        // Validate user exists
        const recipient = await User.findById(user);
        if (!recipient) {
            return res.status(404).json({ message: 'User not found' });
        }

        const notification = new Notification({ user: recipient._id, message, type });
        await notification.save();
        res.status(201).json(notification);
    } catch (error) {
        console.error('Error creating notification:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;