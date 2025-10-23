import api from './api';

export interface ToDoList {
  id: string;
  title: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateListData {
  title: string;
}

export interface UpdateListData {
  title: string;
}

export interface ListResponse {
  success: boolean;
  message: string;
  data: ToDoList | ToDoList[];
}

const listService = {
  /**
   * Get all lists for the authenticated user
   */
  async getAllLists(): Promise<ToDoList[]> {
    const response = await api.get<ListResponse>('/api/lists');
    return Array.isArray(response.data.data) ? response.data.data : [];
  },

  /**
   * Create a new list
   */
  async createList(data: CreateListData): Promise<ToDoList> {
    const response = await api.post<ListResponse>('/api/lists', data);
    return response.data.data as ToDoList;
  },

  /**
   * Update a list
   */
  async updateList(id: string, data: UpdateListData): Promise<ToDoList> {
    const response = await api.put<ListResponse>(`/api/lists/${id}`, data);
    return response.data.data as ToDoList;
  },

  /**
   * Delete a list
   */
  async deleteList(id: string): Promise<void> {
    await api.delete(`/api/lists/${id}`);
  },
};

export default listService;

