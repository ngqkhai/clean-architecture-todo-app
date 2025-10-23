/**
 * Token Storage Utility
 * Manages JWT token in localStorage for persistence
 */

const TOKEN_KEY = 'auth_token';

export const tokenStorage = {
  /**
   * Save authentication token to localStorage
   */
  saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  /**
   * Get authentication token from localStorage
   */
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Remove authentication token from localStorage
   */
  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};

