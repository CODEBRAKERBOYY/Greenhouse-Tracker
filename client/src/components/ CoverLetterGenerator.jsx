import { useState } from 'react';
import axios from 'axios';

function CoverLetterGenerator({ application, onClose }) {
  const [resumeText, setResumeText] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!resumeText.trim()) {
      alert('Please paste your resume text');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/api/ai/generate-cover-letter', {
        resumeText,
        company: application.company,
        position: application.position,
        jobDescription: application.description || '',
      });
      setCoverLetter(response.data.coverLetter);
    } catch (error) {
      console.error('Generation error:', error);
      alert('Failed to generate cover letter. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter);
    alert('Cover letter copied to clipboard!');
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([coverLetter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Cover_Letter_${application.company}_${application.position}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            ✍️ AI Cover Letter Generator
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            ×
          </button>
        </div>

        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Position:</strong> {application.position} at <strong>{application.company}</strong>
          </p>
        </div>

        {!coverLetter ? (
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
                onClick={handleGenerate}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? 'Generating...' : '🚀 Generate Cover Letter'}
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
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Generated Cover Letter
              </label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                rows="16"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={handleCopy}
                className="bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition"
              >
                📋 Copy
              </button>
              <button
                onClick={handleDownload}
                className="bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition"
              >
                💾 Download
              </button>
              <button
                onClick={() => setCoverLetter('')}
                className="bg-purple-500 text-white font-semibold py-3 rounded-lg hover:bg-purple-600 transition"
              >
                🔄 Regenerate
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-full mt-4 bg-gray-500 text-white font-semibold py-3 rounded-lg hover:bg-gray-600 transition"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CoverLetterGenerator;