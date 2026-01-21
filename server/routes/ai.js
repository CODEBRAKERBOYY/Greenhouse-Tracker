const express = require('express');
const router = express.Router();
const { analyzeResume, generateCoverLetter } = require('../services/aiService');

// Analyze resume against job description
router.post('/analyze-resume', async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({ 
        message: 'Resume text and job description are required' 
      });
    }

    const analysis = await analyzeResume(resumeText, jobDescription);
    res.json(analysis);
  } catch (error) {
    console.error('Resume analysis error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Generate cover letter
router.post('/generate-cover-letter', async (req, res) => {
  try {
    const { resumeText, company, position, jobDescription } = req.body;

    if (!resumeText || !company || !position) {
      return res.status(400).json({ 
        message: 'Resume text, company, and position are required' 
      });
    }

    const coverLetter = await generateCoverLetter(
      resumeText, 
      company, 
      position, 
      jobDescription || ''
    );

    res.json({ coverLetter });
  } catch (error) {
    console.error('Cover letter generation error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;