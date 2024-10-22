// src/routes/auth.js
const express = require('express');
const { check, validationResult } = require('express-validator');
const authController = require('../controllers/authController');
const Notification = require('../models/Notification'); // Import Notification model
const User = require('../models/User'); // Import User model
const authMiddleware = require('../middleware/authMiddleware'); // Import authentication middleware
const router = express.Router();

const validateInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// User Registration Route
router.post(
    '/register',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    ],
    validateInput,
    authController.register
);

// User Login Route
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    validateInput,
    authController.login // Directly call the login method here
);

// New route to get the current user's data
router.get('/me', authMiddleware, async (req, res) => {
    try {
        // Fetch user data excluding password
        const user = await User.findById(req.user).select('-password'); // Ensure req.user has the correct value
        
        if (!user) {
            console.log("User not found for ID:", req.user);
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Return user data
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        console.error('Fetch user data error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});


// Admin Login Route
router.post(
    '/admin',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    validateInput,
    authController.adminLogin
);

module.exports = router;
