// src/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['client', 'admin'],
        default: 'client'
    },
    subscriptionType: {
        type: String,
        enum: ['monthly', 'weekly', 'daily'],
        default: 'monthly'
    },
    subscriptionStatus: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    subscriptionValidity: {
        type: Date,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
