import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddApplicationForm from '../components/AddApplicationForm';
import { getApplications, createApplication, deleteApplication } from '../services/api';

function Dashboard() {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
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
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        <div className="mb-6">
          <button onClick={() => setShowAddForm(true)} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
            + Add New Application
          </button>
        </div>

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
                        <a href={app.jobUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline mt-2 inline-block">
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
                      <button onClick={() => handleDelete(app._id)} className="text-red-500 hover:text-red-700 font-bold text-xl">
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

      {showAddForm && (
        <AddApplicationForm
          onClose={() => setShowAddForm(false)}
          onAdd={handleAddApplication}
        />
      )}
    </div>
  );
}

export default Dashboard;