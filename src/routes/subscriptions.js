const express = require('express');
const router = express.Router();
const { createSubscription, getUserSubscription, updateSubscription, deleteSubscription } = require('../controllers/subscriptionController');
const auth = require('../middleware/authMiddleware');

// @route   POST /api/subscriptions
// @desc    Create a subscription
// @access  Private (Admin)
router.post('/', auth, createSubscription);

// @route   GET /api/subscriptions/:userId
// @desc    Get a user's subscription
// @access  Private
router.get('/:userId', auth, getUserSubscription);

// @route   PUT /api/subscriptions/:id
// @desc    Update a subscription
// @access  Private
router.put('/:id', auth, updateSubscription);

// @route   DELETE /api/subscriptions/:id
// @desc    Delete a subscription
// @access  Private (Admin)
router.delete('/:id', auth, deleteSubscription);

module.exports = router;
