const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const analyzeResume = async (resumeText, jobDescription) => {
  try {
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