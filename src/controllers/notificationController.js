// src/controllers/notificationController.js
const Notification = require('../models/Notification');

// Create Notification
const createNotification = async (req, res) => {
    const { user, message } = req.body;

    try {
        const notification = new Notification({ user, message });
        await notification.save();
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Notifications
const getNotifications = async (req, res) => {
    const { userId } = req.params;

    try {
        const notifications = await Notification.find({ user: userId });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createNotification,
    getNotifications
};
