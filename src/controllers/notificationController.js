// src/controllers/notificationController.js
const Notification = require('../models/Notification');
const User = require('../models/User'); // Import User model

// Create Notification - Can be used if needed
const createNotification = async (req, res) => {
    const { user, message, type } = req.body;

    try {
        const notification = new Notification({ user, message, type });
        await notification.save();
        res.status(201).json(notification);
    } catch (error) {
        console.error('Error creating notification:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Notifications for a Specific User
const getNotifications = async (req, res) => {
    const { userId } = req.params;

    try {
        const notifications = await Notification.find({ user: userId });
        if (notifications.length === 0) {
            return res.status(404).json({ message: 'No notifications found for this user.' });
        }
        res.json(notifications);
    } catch (error) {
        console.error('Error retrieving notifications:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get All Notifications (Optional, if you want this functionality)
const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({});
        if (notifications.length === 0) {
            return res.status(404).json({ message: 'No notifications found.' });
        }
        res.json(notifications);
    } catch (error) {
        console.error('Error retrieving all notifications:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createNotification,
    getNotifications,
    getAllNotifications // Export the optional function
};
