// src/services/api.js
import axios from 'axios';

// Configuração inicial do Axios
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // URL base do back-end Laravel
  timeout: 30000, // Tempo limite para requisições
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Exemplo de interceptores 
api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Lidar com erros de resposta
    console.error('Erro na API:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
