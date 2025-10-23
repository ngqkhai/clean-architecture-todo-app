/**
 * ToDoItem API Service
 * Handles CRUD operations for to-do items
 */

import { apiClient } from './client';
import { ToDoItem, CreateItemRequest, UpdateItemRequest } from '../types';

export const itemService = {
  /**
   * Create a new to-do item in a list
   */
  async createItem(listId: string, data: CreateItemRequest): Promise<ToDoItem> {
    const response = await apiClient.post<ToDoItem>(`/items/lists/${listId}/items`, data);
    return response.data;
  },

  /**
   * Get all items in a to-do list
   */
  async getItemsByListId(listId: string): Promise<ToDoItem[]> {
    const response = await apiClient.get<ToDoItem[]>(`/items/lists/${listId}/items`);
    return response.data;
  },

  /**
   * Update a to-do item
   */
  async updateItem(id: string, data: UpdateItemRequest): Promise<ToDoItem> {
    const response = await apiClient.put<ToDoItem>(`/items/${id}`, data);
    return response.data;
  },

  /**
   * Toggle item completion status
   */
  async toggleItemCompletion(id: string): Promise<ToDoItem> {
    const response = await apiClient.patch<ToDoItem>(`/items/${id}/complete`);
    return response.data;
  },

  /**
   * Delete a to-do item
   */
  async deleteItem(id: string): Promise<void> {
    await apiClient.delete(`/items/${id}`);
  },
};

