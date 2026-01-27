import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddApplicationForm from '../components/AddApplicationForm';
import EditApplicationForm from '../components/EditApplicationForm';
import ResumeAnalyzer from '../components/ResumeAnalyzer';
import CoverLetterGenerator from '../components/CoverLetterGenerator';
import { getApplications, createApplication, updateApplication, deleteApplication } from '../services/api';

function Dashboard() {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showResumeAnalyzer, setShowResumeAnalyzer] = useState(false);
  const [showCoverLetter, setShowCoverLetter] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(null);
  const [editingApp, setEditingApp] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const data = await getApplications();
      setApplications(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading applications:', error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleAddApplication = async (formData) => {
    try {
      const newApp = await createApplication(formData);
      setApplications([newApp, ...applications]);
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding application:', error);
      alert('Failed to add application');
    }
  };

  const handleEditClick = (app) => {
    setEditingApp(app);
    setShowEditForm(true);
  };

  const handleUpdateApplication = async (id, formData) => {
    try {
      const updatedApp = await updateApplication(id, formData);
      setApplications(applications.map(app => app._id === id ? updatedApp : app));
      setShowEditForm(false);
      setEditingApp(null);
    } catch (error) {
      console.error('Error updating application:', error);
      alert('Failed to update application');
    }
  };

  const handleQuickStatusUpdate = async (appId, newStatus) => {
    try {
      const app = applications.find(a => a._id === appId);
      const updatedApp = await updateApplication(appId, { ...app, status: newStatus });
      setApplications(applications.map(a => a._id === appId ? updatedApp : a));
      setShowStatusMenu(null);
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await deleteApplication(id);
        setApplications(applications.filter(app => app._id !== id));
      } catch (error) {
        console.error('Error deleting application:', error);
        alert('Failed to delete application');
      }
    }
  };

  const stats = {
    total: applications.length,
    interviews: applications.filter(app => app.status === 'Interview').length,
    offers: applications.filter(app => app.status === 'Offer').length,
    rejected: applications.filter(app => app.status === 'Rejected').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-800">🎯 Greenhouse Tracker</h1>
            <button 
              onClick={handleLogout} 
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-gray-600 text-sm">Total Applications</p>
            <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-gray-600 text-sm">Interviews</p>
            <p className="text-3xl font-bold text-green-600">{stats.interviews}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-gray-600 text-sm">Offers</p>
            <p className="text-3xl font-bold text-purple-600">{stats.offers}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-gray-600 text-sm">Rejected</p>
            <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-6 flex flex-wrap gap-4">
          <button 
            onClick={() => setShowAddForm(true)} 
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition shadow-md"
          >
            + Add New Application
          </button>
          
          <button 
            onClick={() => navigate('/analytics')} 
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition shadow-md"
          >
            📊 View Analytics
          </button>
        </div>

        {/* Applications List */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Applications</h2>
          
          {applications.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No applications yet!</p>
              <p className="text-sm mt-2">Click Add New Application to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <div key={app._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800">{app.position}</h3>
                      <p className="text-gray-600">{app.company}</p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-500">
                        {app.location && <span>📍 {app.location}</span>}
                        {app.salary && <span>💰 {app.salary}</span>}
                        <span>📅 {new Date(app.appliedDate).toLocaleDateString()}</span>
                      </div>
                      {app.notes && <p className="text-sm text-gray-600 mt-2">📝 {app.notes}</p>}
                      {app.jobUrl && (
                        <a 
                          href={app.jobUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-sm text-blue-500 hover:underline mt-2 inline-block"
                        >
                          🔗 View Job Posting
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        app.status === 'Applied' ? 'bg-blue-100 text-blue-700' :
                        app.status === 'Interview' ? 'bg-green-100 text-green-700' :
                        app.status === 'Offer' ? 'bg-purple-100 text-purple-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {app.status}
                      </span>

                      {/* Status Update Dropdown */}
                      <div className="relative">
                        <button
                          onClick={() => setShowStatusMenu(showStatusMenu === app._id ? null : app._id)}
                          className="text-gray-500 hover:text-blue-700 font-bold text-xl"
                          title="Update Status"
                        >
                          🔄
                        </button>
                        
                        {showStatusMenu === app._id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-10">
                            <div className="py-1">
                              <button
                                onClick={() => handleQuickStatusUpdate(app._id, 'Applied')}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                              >
                                📝 Applied
                              </button>
                              <button
                                onClick={() => handleQuickStatusUpdate(app._id, 'Interview')}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                              >
                                💼 Interview
                              </button>
                              <button
                                onClick={() => handleQuickStatusUpdate(app._id, 'Offer')}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                              >
                                🎉 Offer
                              </button>
                              <button
                                onClick={() => handleQuickStatusUpdate(app._id, 'Rejected')}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50"
                              >
                                ❌ Rejected
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          setSelectedApp(app);
                          setShowResumeAnalyzer(true);
                        }}
                        className="text-purple-500 hover:text-purple-700 font-bold text-xl"
                        title="AI Resume Analyzer"
                      >
                        🤖
                      </button>
                      <button
                        onClick={() => {
                          setSelectedApp(app);
                          setShowCoverLetter(true);
                        }}
                        className="text-green-500 hover:text-green-700 font-bold text-xl"
                        title="Generate Cover Letter"
                      >
                        ✍️
                      </button>
                      <button
                        onClick={() => handleEditClick(app)}
                        className="text-blue-500 hover:text-blue-700 font-bold text-xl"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(app._id)}
                        className="text-red-500 hover:text-red-700 font-bold text-xl"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close status menu */}
      {showStatusMenu && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowStatusMenu(null)}
        ></div>
      )}

      {/* Modals */}
      {showAddForm && (
        <AddApplicationForm
          onClose={() => setShowAddForm(false)}
          onAdd={handleAddApplication}
        />
      )}

      {showEditForm && editingApp && (
        <EditApplicationForm
          application={editingApp}
          onClose={() => {
            setShowEditForm(false);
            setEditingApp(null);
          }}
          onUpdate={handleUpdateApplication}
        />
      )}

      {showResumeAnalyzer && selectedApp && (
        <ResumeAnalyzer
          application={selectedApp}
          onClose={() => {
            setShowResumeAnalyzer(false);
            setSelectedApp(null);
          }}
        />
      )}

      {showCoverLetter && selectedApp && (
        <CoverLetterGenerator
          application={selectedApp}
          onClose={() => {
            setShowCoverLetter(false);
            setSelectedApp(null);
          }}
        />
      )}
    </div>
  );
}

export default Dashboard;