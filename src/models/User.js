const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['client', 'admin'],
    default: 'client',
  },
  subscription_type: {
    type: String,
    enum: ['monthly', 'weekly', 'daily'],
  },
  subscription_status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive',
  },
  subscription_validity: {
    type: Date,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);
