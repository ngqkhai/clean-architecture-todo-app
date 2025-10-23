import api from "./api"

export interface TodoItem {
  id: string
  listId: string
  userId: string
  title: string
  description?: string
  startDate?: string
  deadlineDate?: string
  isCompleted: boolean
  createdAt: string
  updatedAt: string
}

export const itemService = {
  async getItemsForList(listId: string): Promise<TodoItem[]> {
    const response = await api.get(`/lists/${listId}/items`)
    // Backend returns { success: true, message: "...", data: [...] }
    return response.data.data
  },

  async createItem(
    listId: string,
    itemData: {
      title: string
      description?: string
      startDate?: string
      deadlineDate?: string
    },
  ): Promise<TodoItem> {
    const response = await api.post(`/lists/${listId}/items`, itemData)
    // Backend returns { success: true, message: "...", data: {...} }
    return response.data.data
  },

  async updateItem(
    id: string,
    itemData: {
      title?: string
      description?: string
      startDate?: string
      deadlineDate?: string
    },
  ): Promise<TodoItem> {
    const response = await api.put(`/items/${id}`, itemData)
    // Backend returns { success: true, message: "...", data: {...} }
    return response.data.data
  },

  async toggleCompletion(id: string): Promise<TodoItem> {
    const response = await api.patch(`/items/${id}/toggle`)
    // Backend returns { success: true, message: "...", data: {...} }
    return response.data.data
  },

  async deleteItem(id: string): Promise<void> {
    await api.delete(`/items/${id}`)
    // Backend returns { success: true, message: "...", data: null }
  },
}
