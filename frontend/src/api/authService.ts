/**
 * Authentication API Service
 * Handles user registration, login, and profile retrieval
 */

import { apiClient } from './client';
import { User, RegisterRequest, LoginRequest, LoginResponse } from '../types';

export const authService = {
  /**
   * Register a new user
   */
  async register(data: RegisterRequest): Promise<{ user: User; token: string }> {
    const response = await apiClient.post<{ user: User; token: string }>('/auth/register', data);
    return response.data;
  },

  /**
   * Login an existing user
   */
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', data);
    return response.data;
  },

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  },
};

