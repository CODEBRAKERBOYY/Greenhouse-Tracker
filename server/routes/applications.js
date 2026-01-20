const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

// Get all applications
router.get('/', async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new application
router.post('/', async (req, res) => {
  const application = new Application({
    user: '507f1f77bcf86cd799439011',
    ...req.body,
  });

  try {
    const newApplication = await application.save();
    res.status(201).json(newApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update application
router.put('/:id', async (req, res) => {
  try {
    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete application
router.delete('/:id', async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ message: 'Application deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;