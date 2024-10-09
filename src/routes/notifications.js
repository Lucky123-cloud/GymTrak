const express = require('express');
const router = express.Router();
const { sendNotification, getUserNotifications } = require('../controllers/notificationController');
const auth = require('../middleware/authMiddleware');

// @route   POST /api/notifications
// @desc    Send a new notification
// @access  Private (Admin)
router.post('/', auth, sendNotification);

// @route   GET /api/notifications/:userId
// @desc    Get all notifications for a user
// @access  Private
router.get('/:userId', auth, getUserNotifications);

module.exports = router;
