import { DomainError } from '../../../domain/errors/DomainError.js';

/**
 * DeleteToDoList Use Case
 * 
 * Deletes a to-do list with ownership validation.
 * Cascade deletion of items is handled by the repository implementation.
 * 
 * Dependencies:
 * - IToDoListRepository (injected via constructor)
 */
export class DeleteToDoList {
  /**
   * Creates a DeleteToDoList use case instance
   * @param {Object} listRepository - Implementation of IToDoListRepository
   */
  constructor(listRepository) {
    this.listRepository = listRepository;
  }

  /**
   * Executes list deletion
   * @param {string} listId - List ID to delete
   * @param {string} userId - User ID (for ownership validation)
   * @returns {Promise<boolean>} True if deleted successfully
   * @throws {DomainError} If list not found or unauthorized
   */
  async execute(listId, userId) {
    // Find existing list
    const existingList = await this.listRepository.findById(listId);
    
    if (!existingList) {
      throw new DomainError('List not found');
    }

    // Validate ownership
    if (existingList.userId !== userId) {
      throw new DomainError('Unauthorized: You do not own this list');
    }

    // Delete list (cascade delete items handled by repository)
    const deleted = await this.listRepository.deleteList(listId);
    
    return deleted;
  }
}

