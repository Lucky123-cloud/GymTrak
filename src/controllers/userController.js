// src/controllers/userController.js

const User = require('../models/User');

// Get the current user's info
const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a user's subscription
const updateSubscription = async (req, res) => {
    const { subscriptionType, subscriptionStatus, subscriptionValidity } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update subscription fields
        user.subscriptionType = subscriptionType || user.subscriptionType;
        user.subscriptionStatus = subscriptionStatus || user.subscriptionStatus;
        user.subscriptionValidity = subscriptionValidity || user.subscriptionValidity;

        // Save the updated user
        await user.save();

        res.json({ message: 'Subscription updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Search for a user by email
const searchUser = async (req, res) => {
    const { email } = req.params;

    try {
        const user = await User.findOne({ email }).select('-password'); // Exclude password from response
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getCurrentUser,
    updateSubscription,
    searchUser // Export the searchUser function
};
