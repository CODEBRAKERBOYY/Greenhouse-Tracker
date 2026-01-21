import { useState } from 'react';
import axios from 'axios';

function ResumeAnalyzer({ application, onClose }) {
  const [resumeText, setResumeText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      alert('Please paste your resume text');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/api/ai/analyze-resume', {
        resumeText,
        jobDescription: application.description || `${application.position} at ${application.company}`,
      });
      setAnalysis(response.data);
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Failed to analyze resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            🤖 AI Resume Analyzer - {application.company}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            ×
          </button>
        </div>

        {!analysis ? (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Paste Your Resume Text
              </label>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                rows="12"
                placeholder="Paste your resume text here..."
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? 'Analyzing...' : '🚀 Analyze Resume'}
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-500 text-white font-semibold py-3 rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
              <h4 className="text-xl font-bold text-gray-800 mb-2">Match Score</h4>
              <p className="text-4xl font-bold text-blue-600">{analysis.matchScore}</p>
            </div>

            {analysis.strengths && (
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-800 mb-3">✅ Key Strengths</h4>
                <ul className="space-y-2">
                  {Array.isArray(analysis.strengths) ? (
                    analysis.strengths.map((strength, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span className="text-gray-700">{strength}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-700">{analysis.strengths}</li>
                  )}
                </ul>
              </div>
            )}

            {analysis.improvements && (
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-800 mb-3">📈 Areas to Improve</h4>
                <ul className="space-y-2">
                  {Array.isArray(analysis.improvements) ? (
                    analysis.improvements.map((improvement, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span className="text-gray-700">{improvement}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-700">{analysis.improvements}</li>
                  )}
                </ul>
              </div>
            )}

            {analysis.missingKeywords && (
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-800 mb-3">🔑 Missing Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(analysis.missingKeywords) ? (
                    analysis.missingKeywords.map((keyword, idx) => (
                      <span key={idx} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                        {keyword}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-700">{analysis.missingKeywords}</span>
                  )}
                </div>
              </div>
            )}

            {analysis.recommendation && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="text-lg font-bold text-gray-800 mb-2">💡 Recommendation</h4>
                <p className="text-gray-700">{analysis.recommendation}</p>
              </div>
            )}

            {analysis.analysis && (
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-800 mb-3">📊 Full Analysis</h4>
                <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap text-sm text-gray-700">
                  {analysis.analysis}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => setAnalysis(null)}
                className="flex-1 bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition"
              >
                ← Analyze Again
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-500 text-white font-semibold py-3 rounded-lg hover:bg-gray-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeAnalyzer;