// src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

// Route to get current user's info
router.get('/me', auth, userController.getCurrentUser);

// Route to update subscription
router.put('/:id/subscription', auth, userController.updateSubscription);

// New route to search for a user by email
router.get('/:email', auth, userController.searchUser); // Add this line

module.exports = router;
