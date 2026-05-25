import axios from 'axios';

// Base URL — uses Vite env variable when deployed, falls back to local json-server
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor — could be used for auth tokens later
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor for normalizing errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong. Please try again.';
    return Promise.reject(new Error(message));
  }
);

// ---- Book API methods ----
export const bookService = {
  getAll: async () => {
    const { data } = await api.get('/books');
    return data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/books/${id}`);
    return data;
  },

  create: async (book) => {
    const { data } = await api.post('/books', book);
    return data;
  },

  update: async (id, book) => {
    const { data } = await api.put(`/books/${id}`, book);
    return data;
  },

  remove: async (id) => {
    const { data } = await api.delete(`/books/${id}`);
    return data;
  },
};

export default api;
