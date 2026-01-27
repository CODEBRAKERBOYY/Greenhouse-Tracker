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
  // ADD THESE FIELDS
  notificationSettings: {
    emailEnabled: {
      type: Boolean,
      default: true,
    },
    followUpReminders: {
      type: Boolean,
      default: true,
    },
    interviewReminders: {
      type: Boolean,
      default: true,
    },
    weeklySummary: {
      type: Boolean,
      default: true,
    },
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);