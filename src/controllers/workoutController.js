const Workout = require('../models/Workout');

// Create a new workout
const createWorkout = async (req, res) => {
    const { date, details } = req.body;
    const userId = req.user.id; // Get user ID from middleware

    try {
        const newWorkout = new Workout({
            user: userId,
            date,
            details
        });
        
        await newWorkout.save();
        res.status(201).json(newWorkout);
    } catch (error) {
        console.error("Error creating workout:", error);
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
        console.error("Error fetching workouts:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a workout
const updateWorkout = async (req, res) => {
    const { workoutId } = req.params;
    const { date, details } = req.body;

    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(workoutId, { date, details }, { new: true });
        if (!updatedWorkout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.json(updatedWorkout);
    } catch (error) {
        console.error("Error updating workout:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a workout
const deleteWorkout = async (req, res) => {
    const { workoutId } = req.params;

    try {
        const deletedWorkout = await Workout.findByIdAndRemove(workoutId);
        if (!deletedWorkout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.json({ message: 'Workout deleted' });
    } catch (error) {
        console.error("Error deleting workout:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createWorkout,
    getWorkouts,
    updateWorkout,
    deleteWorkout
};
