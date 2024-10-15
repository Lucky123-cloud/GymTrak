// src/routes/workout.js
const express = require('express');
const { createWorkout, getWorkouts, updateWorkout, deleteWorkout } = require('../controllers/workoutController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protect the workout routes with authentication middleware
router.use(authMiddleware);

// Create a new workout
router.post('/', createWorkout);

// Get all workouts
router.get('/', getWorkouts);

// Update a workout
router.put('/:workoutId', updateWorkout);

// Delete a workout
router.delete('/:workoutId', deleteWorkout);

module.exports = router;
