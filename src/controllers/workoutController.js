const Workout = require('../models/Workout');

// Create a workout
exports.createWorkout = async (req, res) => {
  const { userId, dayOfWeek, bodyPart, sets, reps } = req.body;

  try {
    const workout = new Workout({
      userId,
      dayOfWeek,
      bodyPart,
      sets,
      reps,
    });

    await workout.save();
    res.json(workout);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get user's workouts
exports.getUserWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.params.userId });
    res.json(workouts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update a workout
exports.updateWorkout = async (req, res) => {
  const { dayOfWeek, bodyPart, sets, reps } = req.body;

  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ msg: 'Workout not found' });
    }

    workout.dayOfWeek = dayOfWeek || workout.dayOfWeek;
    workout.bodyPart = bodyPart || workout.bodyPart;
    workout.sets = sets || workout.sets;
    workout.reps = reps || workout.reps;

    await workout.save();
    res.json(workout);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a workout
exports.deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ msg: 'Workout not found' });
    }

    await workout.remove();
    res.json({ msg: 'Workout removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
