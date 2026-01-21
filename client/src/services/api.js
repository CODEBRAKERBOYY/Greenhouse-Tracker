import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

// Get all applications
export const getApplications = async () => {
  const response = await axios.get(`${API_URL}/applications`);
  return response.data;
};

// Create new application
export const createApplication = async (data) => {
  const response = await axios.post(`${API_URL}/applications`, data);
  return response.data;
};

// Update application
export const updateApplication = async (id, data) => {
  const response = await axios.put(`${API_URL}/applications/${id}`, data);
  return response.data;
};

// Delete application
export const deleteApplication = async (id) => {
  const response = await axios.delete(`${API_URL}/applications/${id}`);
  return response.data;
};

export default {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
};