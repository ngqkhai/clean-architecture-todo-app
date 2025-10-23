import api from "./api"

export interface TodoList {
  id: string
  title: string
  userId: string
  createdAt: string
  updatedAt: string
}

export const listService = {
  async getAllLists(): Promise<TodoList[]> {
    const response = await api.get("/lists")
    // Backend returns { success: true, message: "...", data: [...] }
    return response.data.data
  },

  async createList(title: string): Promise<TodoList> {
    const response = await api.post("/lists", { title })
    // Backend returns { success: true, message: "...", data: {...} }
    return response.data.data
  },

  async updateList(id: string, title: string): Promise<TodoList> {
    const response = await api.put(`/lists/${id}`, { title })
    // Backend returns { success: true, message: "...", data: {...} }
    return response.data.data
  },

  async deleteList(id: string): Promise<void> {
    await api.delete(`/lists/${id}`)
    // Backend returns { success: true, message: "...", data: null }
  },
}
