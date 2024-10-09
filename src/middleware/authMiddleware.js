const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get token from the header
    const token = req.header('Authorization');
    
    // Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // Add the user data to request object
        next(); // Proceed to the next middleware or route
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
