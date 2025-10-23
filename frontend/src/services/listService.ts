import api from './api';

/**
 * To-Do List Service
 * 
 * Handles CRUD operations for to-do lists
 */

interface ToDoList {
  id: string;
  title: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface ListResponse {
  success: boolean;
  message?: string;
  data: ToDoList | ToDoList[];
}

const listService = {
  /**
   * Fetch all lists for the authenticated user
   */
  async getAllLists(): Promise<ToDoList[]> {
    const response = await api.get<ListResponse>('/lists');
    return Array.isArray(response.data.data) ? response.data.data : [];
  },

  /**
   * Create a new list
   */
  async createList(title: string): Promise<ToDoList> {
    const response = await api.post<ListResponse>('/lists', { title });
    return response.data.data as ToDoList;
  },

  /**
   * Update an existing list
   */
  async updateList(id: string, title: string): Promise<ToDoList> {
    const response = await api.put<ListResponse>(`/lists/${id}`, { title });
    return response.data.data as ToDoList;
  },

  /**
   * Delete a list
   */
  async deleteList(id: string): Promise<void> {
    await api.delete(`/lists/${id}`);
  },
};

export default listService;
export type { ToDoList };

