import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
console.log('API Base URL:', baseURL);

const api = axios.create({
         baseURL,
});

api.interceptors.request.use((config) => {
         try {
                  if (typeof window !== 'undefined') {
                           const token = localStorage.getItem('token');
                           if (token) {
                                    // Ensure headers object exists
                                    config.headers = config.headers || {};
                                    config.headers.Authorization = `Bearer ${token}`;
                           }
                  }
         } catch (e) {
                  // In server-side environments localStorage is not available; ignore
         }
         return config;
});

export default api;