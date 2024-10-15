// src/models/Workout.js
const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dayOfWeek: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: true
    },
    bodyPart: {
        type: String,
        enum: ['Lower body', 'Upper body', 'Legs', 'Arms', 'Back', 'Chest'],
        required: true
    },
    exercises: [{
        name: String,
        sets: Number,
        reps: String,
        rest: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('Workout', WorkoutSchema);
