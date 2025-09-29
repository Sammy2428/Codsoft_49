import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const authAPI = {
  register: (userData: any) => api.post('/auth/register', userData),
  login: (credentials: any) => api.post('/auth/login', credentials),
};

// Quiz API calls
export const quizAPI = {
  getQuizzes: () => api.get('/quizzes'),
  getQuiz: (id: number) => api.get(`/quizzes/${id}`),
  createQuiz: (quizData: any) => api.post('/quizzes', quizData),
};

export default api;