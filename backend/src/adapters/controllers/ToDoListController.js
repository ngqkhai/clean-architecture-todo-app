import { success, error } from '../presenters/ResponseFormatter.js';

/**
 * ToDoListController - Handles to-do list endpoints
 * 
 * Orchestrates list-related HTTP requests and use cases.
 */
export class ToDoListController {
  constructor(createListUseCase, getAllListsUseCase, updateListUseCase, deleteListUseCase) {
    this.createListUseCase = createListUseCase;
    this.getAllListsUseCase = getAllListsUseCase;
    this.updateListUseCase = updateListUseCase;
    this.deleteListUseCase = deleteListUseCase;
  }

  /**
   * GET /api/lists
   * Gets all lists for the authenticated user
   */
  async getAllLists(req, res) {
    try {
      const userId = req.user.id;
      const lists = await this.getAllListsUseCase.execute(userId);
      
      res.json(success(lists, 'Lists retrieved successfully'));
    } catch (err) {
      console.error('Get lists error:', err);
      res.status(500).json(error('Failed to retrieve lists', 500));
    }
  }

  /**
   * POST /api/lists
   * Creates a new list
   */
  async createList(req, res) {
    try {
      const { title } = req.body;
      const userId = req.user.id;

      if (!title) {
        return res.status(400).json(error('Title is required', 400));
      }

      const list = await this.createListUseCase.execute(title, userId);
      
      res.status(201).json(success(list, 'List created successfully'));
    } catch (err) {
      if (err.name === 'DomainError') {
        return res.status(400).json(error(err.message, 400));
      }
      
      console.error('Create list error:', err);
      res.status(500).json(error('Failed to create list', 500));
    }
  }

  /**
   * PUT /api/lists/:id
   * Updates a list
   */
  async updateList(req, res) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const userId = req.user.id;

      if (!title) {
        return res.status(400).json(error('Title is required', 400));
      }

      const list = await this.updateListUseCase.execute(id, userId, title);
      
      res.json(success(list, 'List updated successfully'));
    } catch (err) {
      if (err.name === 'DomainError') {
        return res.status(err.message.includes('not found') ? 404 : 403).json(error(err.message));
      }
      
      console.error('Update list error:', err);
      res.status(500).json(error('Failed to update list', 500));
    }
  }

  /**
   * DELETE /api/lists/:id
   * Deletes a list
   */
  async deleteList(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      await this.deleteListUseCase.execute(id, userId);
      
      res.json(success(null, 'List deleted successfully'));
    } catch (err) {
      if (err.name === 'DomainError') {
        return res.status(err.message.includes('not found') ? 404 : 403).json(error(err.message));
      }
      
      console.error('Delete list error:', err);
      res.status(500).json(error('Failed to delete list', 500));
    }
  }
}

