// src/routes/notification.js
const express = require('express');
const { check, validationResult } = require('express-validator');
const notificationController = require('../controllers/notificationController');

const router = express.Router();

// Create Notification
router.post('/', [
    check('user', 'User ID is required').not().isEmpty(),
    check('message', 'Message is required').not().isEmpty()
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, notificationController.createNotification);

// Get Notifications for a User
router.get('/:userId', notificationController.getNotifications);

module.exports = router;
