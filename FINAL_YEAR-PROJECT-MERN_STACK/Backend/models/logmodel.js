// models/LoginLog.js

const mongoose = require('mongoose');

const loginLogSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  action: {
    type: String,
    enum: ['login', 'logout'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('LoginLog', loginLogSchema);
