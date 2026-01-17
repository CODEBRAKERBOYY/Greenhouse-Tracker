import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-800">
              🎯 Greenhouse Tracker
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-gray-600 text-sm">Total Applications</p>
            <p className="text-3xl font-bold text-blue-600">0</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-gray-600 text-sm">Interviews</p>
            <p className="text-3xl font-bold text-green-600">0</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-gray-600 text-sm">Offers</p>
            <p className="text-3xl font-bold text-purple-600">0</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-gray-600 text-sm">Rejected</p>
            <p className="text-3xl font-bold text-red-600">0</p>
          </div>
        </div>

        {/* Add Application Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            + Add New Application
          </button>
        </div>

        {/* Applications List */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Your Applications
          </h2>
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No applications yet!</p>
            <p className="text-sm mt-2">
              Click "Add New Application" to get started
            </p>
          </div>
        </div>
      </div>

      {/* Add Application Modal (we'll build this next) */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Add New Application</h3>
            <p className="text-gray-600 mb-4">Form coming soon...</p>
            <button
              onClick={() => setShowAddForm(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;