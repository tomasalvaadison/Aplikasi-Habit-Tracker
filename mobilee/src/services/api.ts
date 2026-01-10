import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.120.202:3000/api'; // Ganti dengan IP komputer Anda

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  register: (data: { email: string; password: string; name: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
};

// Habit APIs
export const habitAPI = {
  getAll: () => api.get('/habits'),
  getById: (id: number) => api.get(`/habits/${id}`),
  create: (data: any) => api.post('/habits', data),
  update: (id: number, data: any) => api.put(`/habits/${id}`, data),
  delete: (id: number) => api.delete(`/habits/${id}`),
};

// Log APIs
export const logAPI = {
  toggle: (habitId: number, data?: { date?: string; notes?: string }) =>
    api.post(`/logs/${habitId}/toggle`, data),
  getHabitLogs: (habitId: number) => api.get(`/logs/${habitId}`),
  getLogsForDate: (date: string) => api.get(`/logs/date/${date}`),
  getStatistics: () => api.get('/logs/stats/overview'),
};

// Quote APIs
export const quoteAPI = {
  getRandom: () => api.get('/quotes/random'),
};

export default api;
