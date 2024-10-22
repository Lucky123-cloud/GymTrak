// src/controllers/authController.js
const bcrypt = require('bcryptjs'); // Ensure bcrypt is imported
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// User Registration Logic
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        user = new User({
            name,
            email,
            password: await bcrypt.hash(password, 10), // Hash password before saving
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// User Login Logic
exports.login = async (req, res) => {
    const { body: { email, password } } = req;

    console.log("Login attempt with:", email); // Log the email being used for login

    try {
        // Find user by email
        const user = await User.findOne({ email });
        console.log("User found:", user); // Log the found user (should be null if not found)

        if (!user) {
            console.log("User not found for email:", email);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Match password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Invalid password for email:", email);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Admin Login Logic
exports.adminLogin = async (req, res) => {
    const { body: { email, password } } = req;

    try {
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            console.log("Admin login failed: User not found for email:", email);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if the user is an admin
        if (user.role !== 'admin') {
            console.log("Access denied for email:", email);
            return res.status(403).json({ message: 'Access denied. Not an admin.' });
        }

        // Match password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Invalid password for admin email:", email);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token with the name included in the payload
        const token = jwt.sign(
            { userId: user._id, role: user.role, name: user.name }, // Add 'name' to the token
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, user });
    } catch (error) {
        console.error('Admin login error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
