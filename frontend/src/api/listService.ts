/**
 * ToDoList API Service
 * Handles CRUD operations for to-do lists
 */

import { apiClient } from './client';
import { ToDoList, CreateListRequest, UpdateListRequest } from '../types';

export const listService = {
  /**
   * Create a new to-do list
   */
  async createList(data: CreateListRequest): Promise<ToDoList> {
    const response = await apiClient.post<ToDoList>('/lists', data);
    return response.data;
  },

  /**
   * Get all to-do lists for the authenticated user
   */
  async getAllLists(): Promise<ToDoList[]> {
    const response = await apiClient.get<ToDoList[]>('/lists');
    return response.data;
  },

  /**
   * Get a specific to-do list by ID
   */
  async getListById(id: string): Promise<ToDoList> {
    const response = await apiClient.get<ToDoList>(`/lists/${id}`);
    return response.data;
  },

  /**
   * Update a to-do list
   */
  async updateList(id: string, data: UpdateListRequest): Promise<ToDoList> {
    const response = await apiClient.put<ToDoList>(`/lists/${id}`, data);
    return response.data;
  },

  /**
   * Delete a to-do list
   */
  async deleteList(id: string): Promise<void> {
    await apiClient.delete(`/lists/${id}`);
  },
};

