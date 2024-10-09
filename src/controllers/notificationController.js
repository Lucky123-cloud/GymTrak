const Notification = require('../models/Notification');

// Send a notification
exports.sendNotification = async (req, res) => {
  const { userId, type, message } = req.body;

  try {
    const notification = new Notification({
      userId,
      type,
      message,
    });

    await notification.save();
    res.json(notification);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all notifications for a user
exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId });
    res.json(notifications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
