const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    console.log('Authorization Header:', req.header('Authorization'));

    const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : null;

    console.log('Token:', token);

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Log the entire decoded token
        console.log('Decoded Token:', decoded);

        // Assuming the structure is { userId: ..., role: ... }
        req.user = decoded.userId;  // Change this based on the logged structure
        next();
    } catch (err) {
        console.error("Error verifying token:", err);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = auth;
