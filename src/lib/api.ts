import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const auth = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return jwtDecode(token);
  },

  signup: async (data: { email: string; password: string; name: string; isAdmin: boolean }) => {
    const endpoint = data.isAdmin ? '/auth/signup/admin' : '/auth/signup/user';
    const response = await api.post(endpoint, data);
    const { token } = response.data;
    localStorage.setItem('token', token);
    return jwtDecode(token);
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};

export const roles = {
  getAll: () => api.get('/roles').then((res) => res.data),
  create: (data: any) => api.post('/roles', data).then((res) => res.data),
  update: (id: string, data: any) => api.patch(`/roles/${id}`, data).then((res) => res.data),
  delete: (id: string) => api.delete(`/roles/${id}`).then((res) => res.data),
  updatePermissions: (roleId: string, permissions: string[]) => 
    api.post(`/roles/${roleId}/permissions`, { permissions }).then((res) => res.data),
};

export const permissions = {
  getAll: () => api.get('/permissions').then((res) => res.data),
  create: (data: any) => api.post('/permissions', data).then((res) => res.data),
  update: (id: string, data: any) => api.patch(`/permissions/${id}`, data).then((res) => res.data),
  delete: (id: string) => api.delete(`/permissions/${id}`).then((res) => res.data),
};

export const users = {
  getAll: () => api.get('/users').then((res) => res.data),
  create: (data: any) => api.post('/users', data).then((res) => res.data),
  update: (id: string, data: any) => api.patch(`/users/${id}`, data).then((res) => res.data),
  delete: (id: string) => api.delete(`/users/${id}`).then((res) => res.data),
};