const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

// @route   GET /api/users/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, getUserProfile);

module.exports = router;
