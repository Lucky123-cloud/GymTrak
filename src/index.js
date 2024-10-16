// src/index.js
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db')

// Load environment variables
dotenv.config();

//import routes
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const workoutRoutes = require('./routes/workouts')
const notificationRoutes = require('./routes/notification');
const adminRoutes = require('./routes/admin');


//loading the models into the index.js(mains start file)
require('./models/User');
require('./models/Workout');
require('./models/Notification')

const app = express();

// Middleware
app.use(cors());
app.use(express.json());



// MongoDB Connection
connectDB();

//routes
app.use('/api/auth', authRoutes)
app.use('/api', dashboardRoutes); //use the dashboard routes under /api
app.use('/api/workouts', workoutRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);

// Test route to validate Day 2 work
app.get('/test-db', async (req, res) => {
    try {
        // Fetching all users, workouts, and notifications from the database
        const users = await mongoose.model('User').find({});
        const workouts = await mongoose.model('Workout').find({});
        const notifications = await mongoose.model('Notification').find({});
        
        // Sending the fetched data as a JSON response
        res.json({ users, workouts, notifications });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});