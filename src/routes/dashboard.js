const express = require('express');
const auth = require('../middleware/authMiddleware'); // Middleware to authenticate token
const User = require('../models/User');
const Workout = require('../models/Workout');

const router = express.Router();

// Get user's subscription and workout details
router.get('/dashboard', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const workouts = await Workout.find({ user: req.user.id });

        res.json({
            user,
            workouts,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
