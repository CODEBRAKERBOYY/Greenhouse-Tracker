const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const { protect } = require('../middleware/auth');

router.use(protect);

// Get all applications
router.get('/', async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new application
router.post('/', async (req, res) => {
  const application = new Application({
    ...req.body,
    user: req.user._id,
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
    const updatedApplication = await Application.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json(updatedApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete application
router.delete('/:id', async (req, res) => {
  try {
    const deletedApplication = await Application.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!deletedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({ message: 'Application deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
