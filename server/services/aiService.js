const Groq = require('groq-sdk');

const groq = process.env.GROQ_API_KEY
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null;

const normalizeWords = (text) => (
  new Set((text || '').toLowerCase().match(/[a-z][a-z0-9+#.-]{2,}/g) || [])
);

const localResumeAnalysis = (resumeText, jobDescription) => {
  const resumeWords = normalizeWords(resumeText);
  const jobWords = [...normalizeWords(jobDescription)];
  const matched = jobWords.filter(word => resumeWords.has(word));
  const missing = jobWords.filter(word => !resumeWords.has(word)).slice(0, 12);
  const matchScore = jobWords.length
    ? Math.round((matched.length / jobWords.length) * 100)
    : 50;

  return {
    matchScore: `${matchScore}%`,
    strengths: [
      'Resume content was compared against the job description keywords.',
      matched.length ? `Matched keywords include: ${matched.slice(0, 8).join(', ')}.` : 'Add more role-specific language from the job post.',
      'Use measurable achievements where possible to strengthen fit.',
    ],
    improvements: [
      'Mirror the most important requirements from the job description.',
      'Add specific tools, technologies, and outcomes that match the role.',
      'Keep bullets concise and focused on impact.',
    ],
    missingKeywords: missing,
    recommendation: 'GROQ_API_KEY is not configured, so this local keyword analysis was used. Add a Groq key for deeper AI feedback.',
  };
};

const localCoverLetter = (resumeText, company, position, jobDescription) => {
  const resumeSnippet = resumeText.trim().split(/\s+/).slice(0, 55).join(' ');
  const roleFocus = jobDescription
    ? `The role description stood out to me because it emphasizes ${jobDescription.trim().split(/\s+/).slice(0, 24).join(' ')}.`
    : `The ${position} role looks like a strong fit for my background and interests.`;

  return `Dear Hiring Manager,

I am excited to apply for the ${position} position at ${company}. ${roleFocus}

My background includes experience that aligns with this opportunity, including ${resumeSnippet || 'relevant projects, problem solving, and cross-functional collaboration'}. I am especially interested in contributing practical execution, clear communication, and a strong ownership mindset to your team.

I would welcome the chance to discuss how my skills can support ${company}'s goals. Thank you for your time and consideration.

Sincerely,
Your Name

Note: GROQ_API_KEY is not configured, so this template was generated locally. Add a Groq key for a fully AI-tailored letter.`;
};

const analyzeResume = async (resumeText, jobDescription) => {
  try {
    if (!groq) {
      return localResumeAnalysis(resumeText, jobDescription);
    }

    const prompt = `You are an expert resume analyzer and career coach.

Resume:
${resumeText}

Job Description:
${jobDescription}

Analyze how well this resume matches the job description. Provide:
1. Match Score (0-100%)
2. Key Strengths (3-5 points)
3. Areas to Improve (3-5 points)
4. Missing Keywords (list important ones)
5. Overall Recommendation

Format your response as JSON with these exact keys: matchScore, strengths, improvements, missingKeywords, recommendation`;

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const content = response.choices[0].message.content;
    
    // Try to parse JSON, if it fails return structured text
    try {
      return JSON.parse(content);
    } catch {
      return {
        matchScore: 'N/A',
        analysis: content
      };
    }
  } catch (error) {
    console.error('AI Analysis Error:', error);
    throw new Error('Failed to analyze resume');
  }
};

const generateCoverLetter = async (resumeText, company, position, jobDescription) => {
  try {
    if (!groq) {
      return localCoverLetter(resumeText, company, position, jobDescription);
    }

    const prompt = `You are a professional cover letter writer.

Resume Summary:
${resumeText}

Company: ${company}
Position: ${position}
Job Description:
${jobDescription}

Write a compelling, professional cover letter (250-300 words) that:
1. Shows enthusiasm for the role
2. Highlights relevant experience from the resume
3. Explains why they're a great fit
4. Includes specific details about the company/role

Write in first person, professional but personable tone.`;

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 800,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Cover Letter Generation Error:', error);
    throw new Error('Failed to generate cover letter');
  }
};

module.exports = {
  analyzeResume,
  generateCoverLetter,
};
