const Subscription = require('../models/Subscription');

// Create a subscription
exports.createSubscription = async (req, res) => {
  const { userId, type, status, validity } = req.body;

  try {
    const subscription = new Subscription({
      userId,
      type,
      status,
      validity,
    });

    await subscription.save();
    res.json(subscription);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get a user's subscription
exports.getUserSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ userId: req.params.userId });
    if (!subscription) {
      return res.status(404).json({ msg: 'Subscription not found' });
    }
    res.json(subscription);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update a subscription
exports.updateSubscription = async (req, res) => {
  const { type, status, validity } = req.body;

  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({ msg: 'Subscription not found' });
    }

    subscription.type = type || subscription.type;
    subscription.status = status || subscription.status;
    subscription.validity = validity || subscription.validity;

    await subscription.save();
    res.json(subscription);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a subscription
exports.deleteSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      return res.status(404).json({ msg: 'Subscription not found' });
    }

    await subscription.remove();
    res.json({ msg: 'Subscription removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
