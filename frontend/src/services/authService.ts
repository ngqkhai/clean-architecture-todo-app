import api from './api';

/**
 * Authentication Service
 * 
 * Handles user authentication operations including:
 * - User registration
 * - User login (with JWT token storage)
 * - User logout
 * - Token and authentication state management
 */

interface User {
  id: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

interface RegisterResponse {
  success: boolean;
  message: string;
  data: User;
}

const authService = {
  /**
   * Register a new user
   */
  async register(email: string, password: string): Promise<User> {
    const response = await api.post<RegisterResponse>('/auth/register', {
      email,
      password,
    });
    return response.data.data;
  },

  /**
   * Login user and store JWT token
   */
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const response = await api.post<LoginResponse>('/auth/login', {
      email,
      password,
    });
    
    const { user, token } = response.data.data;
    
    // Store token and user in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return { user, token };
  },

  /**
   * Logout user and clear stored data
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Get stored JWT token
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  },

  /**
   * Get stored user data
   */
  getUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};

export default authService;
export type { User };

