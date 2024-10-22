const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    details: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Workout', WorkoutSchema);
