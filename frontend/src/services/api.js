import axios from 'axios';

const API_URL = 'http://localhost:5001'; // Your backend URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/api/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Add more API functions as needed

export default api;
