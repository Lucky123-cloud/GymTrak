const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const loggerMiddleware = require('./middleware/loggerMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse body data (JSON and URL-encoded data)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware (logs request info)
app.use(loggerMiddleware);

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit with failure
    }
};
connectDB();

// Routes
app.use('/api/auth', authRoutes); // Auth routes
app.use('/api/users', userRoutes); // User routes

// Error handling middleware (must come after the routes)
app.use(errorMiddleware);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
