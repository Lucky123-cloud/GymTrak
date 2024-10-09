const express = require('express');
const router = express.Router();
const { createWorkout, getUserWorkouts, updateWorkout, deleteWorkout } = require('../controllers/workoutController');
const auth = require('../middleware/authMiddleware');

// @route   POST /api/workouts
// @desc    Create a new workout
// @access  Private
router.post('/', auth, createWorkout);

// @route   GET /api/workouts/:userId
// @desc    Get user's workouts
// @access  Private
router.get('/:userId', auth, getUserWorkouts);

// @route   PUT /api/workouts/:id
// @desc    Update a workout
// @access  Private
router.put('/:id', auth, updateWorkout);

// @route   DELETE /api/workouts/:id
// @desc    Delete a workout
// @access  Private
router.delete('/:id', auth, deleteWorkout);

module.exports = router;
