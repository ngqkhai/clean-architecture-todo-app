/**
 * Frontend Type Definitions
 * Mirrors backend entities for type-safe client-side code
 */

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ToDoList {
  id: string;
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ToDoItem {
  id: string;
  listId: string;
  title: string;
  description: string | null;
  isCompleted: boolean;
  startDate: Date | null;
  deadlineDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// API Request/Response types
export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface CreateListRequest {
  title: string;
}

export interface UpdateListRequest {
  title: string;
}

export interface CreateItemRequest {
  title: string;
  description?: string | null;
  startDate?: string | null;
  deadlineDate?: string | null;
}

export interface UpdateItemRequest {
  title?: string;
  description?: string | null;
  startDate?: string | null;
  deadlineDate?: string | null;
}

