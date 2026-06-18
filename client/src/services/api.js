import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }

    return Promise.reject(error);
  }
);

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const register = async (data) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

// Get all applications
export const getApplications = async () => {
  const response = await api.get('/applications');
  return response.data;
};

// Create new application
export const createApplication = async (data) => {
  const response = await api.post('/applications', data);
  return response.data;
};

// Update application
export const updateApplication = async (id, data) => {
  const response = await api.put(`/applications/${id}`, data);
  return response.data;
};

// Delete application
export const deleteApplication = async (id) => {
  const response = await api.delete(`/applications/${id}`);
  return response.data;
};

export const getAnalyticsOverview = async () => {
  const response = await api.get('/analytics/overview');
  return response.data;
};

export const getMonthlyAnalytics = async () => {
  const response = await api.get('/analytics/monthly');
  return response.data;
};

export const analyzeResume = async (data) => {
  const response = await api.post('/ai/analyze-resume', data);
  return response.data;
};

export const generateCoverLetter = async (data) => {
  const response = await api.post('/ai/generate-cover-letter', data);
  return response.data;
};

export default {
  login,
  register,
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
  getAnalyticsOverview,
  getMonthlyAnalytics,
  analyzeResume,
  generateCoverLetter,
};
