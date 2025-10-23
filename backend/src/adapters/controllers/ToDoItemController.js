import { success, error } from '../presenters/ResponseFormatter.js';

/**
 * ToDoItemController - Handles to-do item endpoints
 * 
 * Orchestrates item-related HTTP requests and use cases.
 */
export class ToDoItemController {
  constructor(createItemUseCase, getItemsUseCase, updateItemUseCase, toggleCompletionUseCase, deleteItemUseCase) {
    this.createItemUseCase = createItemUseCase;
    this.getItemsUseCase = getItemsUseCase;
    this.updateItemUseCase = updateItemUseCase;
    this.toggleCompletionUseCase = toggleCompletionUseCase;
    this.deleteItemUseCase = deleteItemUseCase;
  }

  /**
   * GET /api/lists/:listId/items
   * Gets all items for a list
   */
  async getItemsForList(req, res) {
    try {
      const { listId } = req.params;
      const userId = req.user.id;

      const items = await this.getItemsUseCase.execute(listId, userId);
      
      res.json(success(items, 'Items retrieved successfully'));
    } catch (err) {
      if (err.name === 'DomainError') {
        return res.status(err.message.includes('not found') ? 404 : 403).json(error(err.message));
      }
      
      console.error('Get items error:', err);
      res.status(500).json(error('Failed to retrieve items', 500));
    }
  }

  /**
   * POST /api/lists/:listId/items
   * Creates a new item
   */
  async createItem(req, res) {
    try {
      const { listId } = req.params;
      const { title, description, startDate, deadlineDate } = req.body;
      const userId = req.user.id;

      if (!title) {
        return res.status(400).json(error('Title is required', 400));
      }

      const itemData = {
        title,
        description: description || '',
        startDate: startDate ? new Date(startDate) : null,
        deadlineDate: deadlineDate ? new Date(deadlineDate) : null
      };

      const item = await this.createItemUseCase.execute(listId, userId, itemData);
      
      res.status(201).json(success(item, 'Item created successfully'));
    } catch (err) {
      if (err.name === 'DomainError') {
        return res.status(400).json(error(err.message, 400));
      }
      
      console.error('Create item error:', err);
      res.status(500).json(error('Failed to create item', 500));
    }
  }

  /**
   * PUT /api/items/:id
   * Updates an item
   */
  async updateItem(req, res) {
    try {
      const { id } = req.params;
      const { title, description, startDate, deadlineDate } = req.body;
      const userId = req.user.id;

      const updates = {};
      if (title !== undefined) updates.title = title;
      if (description !== undefined) updates.description = description;
      if (startDate !== undefined) updates.startDate = startDate ? new Date(startDate) : null;
      if (deadlineDate !== undefined) updates.deadlineDate = deadlineDate ? new Date(deadlineDate) : null;

      const item = await this.updateItemUseCase.execute(id, userId, updates);
      
      res.json(success(item, 'Item updated successfully'));
    } catch (err) {
      if (err.name === 'DomainError') {
        return res.status(err.message.includes('not found') ? 404 : 403).json(error(err.message));
      }
      
      console.error('Update item error:', err);
      res.status(500).json(error('Failed to update item', 500));
    }
  }

  /**
   * PATCH /api/items/:id/toggle
   * Toggles item completion status
   */
  async toggleCompletion(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const item = await this.toggleCompletionUseCase.execute(id, userId);
      
      res.json(success(item, 'Item completion toggled successfully'));
    } catch (err) {
      if (err.name === 'DomainError') {
        return res.status(err.message.includes('not found') ? 404 : 403).json(error(err.message));
      }
      
      console.error('Toggle completion error:', err);
      res.status(500).json(error('Failed to toggle completion', 500));
    }
  }

  /**
   * DELETE /api/items/:id
   * Deletes an item
   */
  async deleteItem(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      await this.deleteItemUseCase.execute(id, userId);
      
      res.json(success(null, 'Item deleted successfully'));
    } catch (err) {
      if (err.name === 'DomainError') {
        return res.status(err.message.includes('not found') ? 404 : 403).json(error(err.message));
      }
      
      console.error('Delete item error:', err);
      res.status(500).json(error('Failed to delete item', 500));
    }
  }
}

