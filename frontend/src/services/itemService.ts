import api from './api';

/**
 * To-Do Item Service
 * 
 * Handles CRUD operations for to-do items
 */

interface ToDoItem {
  id: string;
  title: string;
  description: string | null;
  isCompleted: boolean;
  listId: string;
  userId: string;
  startDate: string | null;
  deadlineDate: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ItemData {
  title: string;
  description?: string;
  startDate?: string;
  deadlineDate?: string;
}

interface ItemResponse {
  success: boolean;
  message?: string;
  data: ToDoItem | ToDoItem[];
}

const itemService = {
  /**
   * Fetch all items for a specific list
   */
  async getItemsForList(listId: string): Promise<ToDoItem[]> {
    const response = await api.get<ItemResponse>(`/lists/${listId}/items`);
    return Array.isArray(response.data.data) ? response.data.data : [];
  },

  /**
   * Create a new item in a list
   */
  async createItem(listId: string, itemData: ItemData): Promise<ToDoItem> {
    const response = await api.post<ItemResponse>(`/lists/${listId}/items`, itemData);
    return response.data.data as ToDoItem;
  },

  /**
   * Update an existing item
   */
  async updateItem(id: string, itemData: Partial<ItemData>): Promise<ToDoItem> {
    const response = await api.put<ItemResponse>(`/items/${id}`, itemData);
    return response.data.data as ToDoItem;
  },

  /**
   * Toggle item completion status
   */
  async toggleCompletion(id: string): Promise<ToDoItem> {
    const response = await api.patch<ItemResponse>(`/items/${id}/toggle`);
    return response.data.data as ToDoItem;
  },

  /**
   * Delete an item
   */
  async deleteItem(id: string): Promise<void> {
    await api.delete(`/items/${id}`);
  },
};

export default itemService;
export type { ToDoItem, ItemData };

