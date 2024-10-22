// src/index.js
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const workoutRoutes = require('./routes/workouts');
const notificationRoutes = require('./routes/notifications');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/users');

// Connect to MongoDB
const connectDB = require('./config/db');
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: '*', // Allow all origins for development; restrict in production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json()); // Use express's built-in body parser
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);

// Default route for the login page (frontend)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// Test route for MongoDB connection
app.get('/test-db', async (req, res) => {
    try {
        const users = await mongoose.model('User').find({});
        const workouts = await mongoose.model('Workout').find({});
        const notifications = await mongoose.model('Notification').find({});
        res.json({ users, workouts, notifications });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Handle 404 for undefined routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server Error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});