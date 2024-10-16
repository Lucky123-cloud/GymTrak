const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

// Route to get current user's info
router.get('/me', auth, userController.getCurrentUser);

module.exports = router;
