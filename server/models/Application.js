const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Applied', 'Interview', 'Offer', 'Rejected', 'Withdrawn'],
    default: 'Applied',
  },
  salary: {
    type: String,
  },
  location: {
    type: String,
  },
  jobUrl: {
    type: String,
  },
  description: {
    type: String,
  },
  notes: {
    type: String,
  },
  appliedDate: {
    type: Date,
    default: Date.now,
  },
  followUpDate: {
    type: Date,
  },
  resumeUsed: {
    type: String,
  },
  coverLetter: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Application', ApplicationSchema);