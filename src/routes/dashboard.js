const express = require('express');
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');
const Workout = require('../models/Workout');
const router = express.Router();

// Dashboard route for clients and admins
router.get('/dashboard', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Get the user's workouts
        const workouts = await Workout.find({ user: req.user.id });

        // Response tailored for both clients and admins
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
