import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAnalyticsOverview, getMonthlyAnalytics } from '../services/api';
import { 
  LineChart, Line, PieChart, Pie, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell 
} from 'recharts';

function Analytics() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      console.log('Loading analytics...');
      const overviewRes = await getAnalyticsOverview();
      console.log('Overview response:', overviewRes);
      
      const monthlyRes = await getMonthlyAnalytics();
      console.log('Monthly response:', monthlyRes);
      
      if (overviewRes.success) {
        setOverview(overviewRes.data);
      }
      if (monthlyRes.success) {
        setMonthlyData(monthlyRes.data);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error loading analytics:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 font-medium">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
          <div className="text-6xl mb-4 text-center">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Error Loading Data</h2>
          <p className="text-gray-600 text-center mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-medium mb-2"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!overview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
          <div className="text-6xl mb-4 text-center">📊</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">No Data Available</h2>
          <p className="text-gray-600 text-center mb-6">Start adding applications to see analytics</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-medium"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const { stats, statusData, timelineData, companyData } = overview;

  const statusChartData = Object.entries(statusData).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = {
    Applied: '#3B82F6',
    Interview: '#F59E0B',
    Offer: '#10B981',
    Rejected: '#EF4444',
    Withdrawn: '#6B7280',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <nav className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                📊 Analytics Dashboard
              </h1>
              <p className="text-gray-600 text-sm mt-1">Deep insights into your job search journey</p>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-medium shadow-md"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Total Applications</p>
              <span className="text-2xl">📝</span>
            </div>
            <p className="text-4xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-xs text-gray-500 mt-2">All time applications</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Interview Rate</p>
              <span className="text-2xl">💼</span>
            </div>
            <p className="text-4xl font-bold text-yellow-600">{stats.interviewRate}%</p>
            <p className="text-xs text-gray-500 mt-2">{stats.interviews} interviews secured</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Offer Rate</p>
              <span className="text-2xl">🎉</span>
            </div>
            <p className="text-4xl font-bold text-green-600">{stats.offerRate}%</p>
            <p className="text-xs text-gray-500 mt-2">{stats.offers} offers received</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Rejection Rate</p>
              <span className="text-2xl">📉</span>
            </div>
            <p className="text-4xl font-bold text-red-600">{stats.rejectionRate}%</p>
            <p className="text-xs text-gray-500 mt-2">{stats.rejected} rejections</p>
          </div>
        </div>

        {/* Key Insights Banner */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg p-6 mb-8 text-white">
          <h2 className="text-xl font-bold mb-2">💡 Key Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm opacity-90">Your interview rate is {stats.interviewRate}%</p>
              <p className="text-xs opacity-75 mt-1">
                {parseFloat(stats.interviewRate) > 20 ? '🎯 Great job! Keep it up!' : '💪 Keep applying and optimizing your resume'}
              </p>
            </div>
            <div>
              <p className="text-sm opacity-90">You've applied to {companyData.length} different companies</p>
              <p className="text-xs opacity-75 mt-1">
                {companyData.length > 10 ? '🌟 Diverse portfolio!' : '📈 Consider expanding your search'}
              </p>
            </div>
            <div>
              <p className="text-sm opacity-90">Active applications: {stats.total - stats.rejected}</p>
              <p className="text-xs opacity-75 mt-1">
                {stats.total - stats.rejected > 5 ? '🔥 Strong pipeline!' : '🎯 Time to apply more'}
              </p>
            </div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Applications Over Time */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">📈 Applications Over Time</h3>
              <span className="text-sm text-gray-500">Last 6 months</span>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 11 }} 
                  stroke="#666"
                />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #ccc',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  name="Applications"
                  dot={{ fill: '#8B5CF6', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Status Distribution */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">📊 Status Distribution</h3>
              <span className="text-sm text-gray-500">Current breakdown</span>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value, percent }) => 
                    `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                  }
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Companies */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">🏢 Top Companies Applied</h3>
              <span className="text-sm text-gray-500">Top 10</span>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={companyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="company" 
                  tick={{ fontSize: 10 }} 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  stroke="#666"
                />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #ccc',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="count" 
                  fill="#3B82F6" 
                  name="Applications"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Trends */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">📅 Monthly Status Trends</h3>
              <span className="text-sm text-gray-500">By month</span>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 10 }} 
                  stroke="#666"
                />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #ccc',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="Applied" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="Interview" stroke="#F59E0B" strokeWidth={2} />
                <Line type="monotone" dataKey="Offer" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="Rejected" stroke="#EF4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Success Tips */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">💪 Tips to Improve Your Success Rate</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="font-semibold text-blue-800 mb-2">📝 Customize Applications</p>
              <p className="text-sm text-gray-700">Tailor your resume and cover letter for each job</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="font-semibold text-green-800 mb-2">🔍 Follow Up</p>
              <p className="text-sm text-gray-700">Send follow-up emails 1-2 weeks after applying</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="font-semibold text-purple-800 mb-2">🤝 Network</p>
              <p className="text-sm text-gray-700">Connect with employees at target companies</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;