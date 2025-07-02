// src/api/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para incluir el token en cada solicitud autenticada
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- AUTENTICACIÓN ---
export const registerUser = async (data: { email: string; password: string }) => {
  const res = await api.post('/auth/register', data);
  return res.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await api.post('/auth/login', data);
  return res.data;
};

export const getProfile = async () => {
  const res = await api.get('/auth/profile');
  return res.data;
};

// --- PELÍCULAS ---
export const searchMovies = async (params: {
  title: string;
  year?: string;
  type?: string;
  page?: number;
}) => {
  const res = await api.get('/movies/search', { params });
  return res.data;
};

export const getMovieDetails = async (imdbID: string) => {
  const res = await api.get(`/movies/details/${imdbID}`);
  return res.data;
};

// --- FAVORITOS ---
export const getFavorites = async () => {
  const res = await api.get('/movies/favorites');
  return res.data;
};

export const addFavorite = async (imdbID: string) => {
  const res = await api.post('/movies/favorites', { imdbID });
  return res.data;
};

export const removeFavorite = async (imdbID: string) => {
  const res = await api.delete(`/movies/favorites/${imdbID}`);
  return res.data;
};

export const rateFavorite = async (imdbID: string, rating: number) => {
  const res = await api.put(`/movies/favorites/${imdbID}/rate`, { rating });
  return res.data;
};

export default api;

