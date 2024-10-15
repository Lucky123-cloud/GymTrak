// src/controllers/workoutController.js
const Workout = require('../models/Workout');

// Create a new workout
const createWorkout = async (req, res) => {
    const { dayOfWeek, bodyPart, exercises } = req.body;
    const userId = req.user.id; // Get user ID from middleware

    try {
        const newWorkout = new Workout({
            user: userId,
            dayOfWeek,
            bodyPart,
            exercises
        });
        
        await newWorkout.save();
        res.status(201).json(newWorkout);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all workouts for a user
const getWorkouts = async (req, res) => {
    const userId = req.user.id; // Get user ID from middleware

    try {
        const workouts = await Workout.find({ user: userId });
        res.json(workouts);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a workout
const updateWorkout = async (req, res) => {
    const { workoutId } = req.params; // Get workout ID from URL parameters
    const updates = req.body;

    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(workoutId, updates, { new: true });
        if (!updatedWorkout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.json(updatedWorkout);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a workout
const deleteWorkout = async (req, res) => {
    const { workoutId } = req.params; // Get workout ID from URL parameters

    try {
        const deletedWorkout = await Workout.findByIdAndRemove(workoutId);
        if (!deletedWorkout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.json({ message: 'Workout deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createWorkout,
    getWorkouts,
    updateWorkout,
    deleteWorkout
};
