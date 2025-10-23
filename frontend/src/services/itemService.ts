import api from './api';

export interface ToDoItem {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  listId: string;
  userId: string;
  startDate: string | null;
  deadlineDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateItemData {
  title: string;
  description?: string;
  startDate?: string;
  deadlineDate?: string;
}

export interface UpdateItemData {
  title?: string;
  description?: string;
  startDate?: string | null;
  deadlineDate?: string | null;
}

export interface ItemResponse {
  success: boolean;
  message: string;
  data: ToDoItem | ToDoItem[];
}

const itemService = {
  /**
   * Get all items for a specific list
   */
  async getItemsForList(listId: string): Promise<ToDoItem[]> {
    const response = await api.get<ItemResponse>(`/api/lists/${listId}/items`);
    return Array.isArray(response.data.data) ? response.data.data : [];
  },

  /**
   * Create a new item in a list
   */
  async createItem(listId: string, data: CreateItemData): Promise<ToDoItem> {
    const response = await api.post<ItemResponse>(`/api/lists/${listId}/items`, data);
    return response.data.data as ToDoItem;
  },

  /**
   * Update an item
   */
  async updateItem(id: string, data: UpdateItemData): Promise<ToDoItem> {
    const response = await api.put<ItemResponse>(`/api/items/${id}`, data);
    return response.data.data as ToDoItem;
  },

  /**
   * Toggle item completion status
   */
  async toggleCompletion(id: string): Promise<ToDoItem> {
    const response = await api.patch<ItemResponse>(`/api/items/${id}/toggle`);
    return response.data.data as ToDoItem;
  },

  /**
   * Delete an item
   */
  async deleteItem(id: string): Promise<void> {
    await api.delete(`/api/items/${id}`);
  },
};

export default itemService;

