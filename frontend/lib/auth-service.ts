import api from "./api"

export interface AuthResponse {
  user: {
    id: string
    email: string
  }
  token: string
}

export const authService = {
  async register(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post("/auth/register", { email, password })
    // Backend returns { success: true, message: "...", data: { id, email } }
    // We need to handle the user data and will get token from login
    const userData = response.data.data
    
    // After registration, login to get the token
    return this.login(email, password)
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post("/auth/login", { email, password })
    // Backend returns { success: true, message: "...", data: { user: {...}, token: "..." } }
    return response.data.data
  },

  logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
    }
  },

  getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token")
    }
    return null
  },

  isAuthenticated(): boolean {
    return this.getToken() !== null
  },

  setToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token)
    }
  },
}
