// src/types/index.ts

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface Movie {
  id?: number;
  imdbID: string;
  title: string;
  year: string;
  type: string;
  genre?: string;
  director?: string;
  actors?: string;
  plot?: string;
  poster?: string;
  runtime?: string;
  rating?: number;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
}
