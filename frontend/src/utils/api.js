// src/utils/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // your backend URL
});

// Optional: add JWT token automatically if logged in
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // or your auth storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
