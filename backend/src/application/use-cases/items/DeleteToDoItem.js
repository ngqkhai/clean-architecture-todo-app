import { DomainError } from '../../../domain/errors/DomainError.js';

/**
 * DeleteToDoItem Use Case
 * 
 * Deletes a to-do item with ownership validation.
 * 
 * Dependencies:
 * - IToDoItemRepository (injected via constructor)
 */
export class DeleteToDoItem {
  /**
   * Creates a DeleteToDoItem use case instance
   * @param {Object} itemRepository - Implementation of IToDoItemRepository
   */
  constructor(itemRepository) {
    this.itemRepository = itemRepository;
  }

  /**
   * Executes item deletion
   * @param {string} itemId - Item ID to delete
   * @param {string} userId - User ID (for ownership validation)
   * @returns {Promise<boolean>} True if deleted successfully
   * @throws {DomainError} If item not found or unauthorized
   */
  async execute(itemId, userId) {
    // Find existing item
    const existingItem = await this.itemRepository.findById(itemId);
    
    if (!existingItem) {
      throw new DomainError('Item not found');
    }

    // Validate ownership
    if (existingItem.userId !== userId) {
      throw new DomainError('Unauthorized: You do not own this item');
    }

    // Delete item
    const deleted = await this.itemRepository.deleteItem(itemId);
    
    return deleted;
  }
}

