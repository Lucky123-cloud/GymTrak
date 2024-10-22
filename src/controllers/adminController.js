const User = require('../models/User');
const Notification = require('../models/Notification');
const Workout = require('../models/Workout');

// Function to search for a user by email
const searchUser = async (req, res) => {
    const email = req.params.email;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }
        res.json(user);
    } catch (error) {
        console.error("Error searching user:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to send notifications
const sendNotification = async (req, res) => {
    const { message, type, userId } = req.body;

    try {
        const notification = new Notification({
            message,
            type,
            userId: userId || null // For all users if userId is not provided
        });
        await notification.save();
        res.status(201).json({ message: 'Notification sent successfully!' });
    } catch (error) {
        console.error("Error sending notification:", error);
        res.status(500).json({ message: 'Error sending notification' });
    }
};

// Function to update workouts
const updateWorkouts = async (req, res) => {
    const { userId, date, details } = req.body;

    try {
        const workout = await Workout.findOneAndUpdate(
            { userId, date },
            { details },
            { new: true, runValidators: true }
        );

        if (!workout) {
            return res.status(404).json({ message: 'Workout not found!' });
        }

        res.json({ message: 'Workout updated successfully!', workout });
    } catch (error) {
        console.error("Error updating workout:", error);
        res.status(500).json({ message: 'Error updating workout' });
    }
};

// Function to change subscription status
const changeSubscription = async (req, res) => {
    const { userId, status, type } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        user.subscriptionStatus = status;
        user.subscriptionType = type;

        await user.save();
        res.json({ message: 'Subscription updated successfully!', user });
    } catch (error) {
        console.error("Error changing subscription:", error);
        res.status(500).json({ message: 'Error changing subscription' });
    }
};

module.exports = {
    searchUser,
    sendNotification,
    updateWorkouts,
    changeSubscription
};
