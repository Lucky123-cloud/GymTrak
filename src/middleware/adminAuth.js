const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Admin authentication middleware
module.exports = (req, res, next) => {
    // Log the authorization header for debugging
    console.log('Authorization Header:', req.header('Authorization'));

    // Get the token from the Authorization header
    const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : null;
    
    // Log the extracted token
    console.log('Token:', token);

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Log decoded token
        console.log('Decoded Token:', decoded);

        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Not an admin.' });
        }

        req.user = decoded; // Store user info in request object
        next();
    } catch (error) {
        // Log any errors during token verification
        console.error("Error verifying token:", error);
        res.status(401).json({ message: 'Invalid token' });
    }
};
