import { DomainError } from '../../../domain/errors/DomainError.js';

/**
 * ToggleItemCompletion Use Case
 * 
 * Toggles the completion status of a to-do item.
 * 
 * Dependencies:
 * - IToDoItemRepository (injected via constructor)
 */
export class ToggleItemCompletion {
  /**
   * Creates a ToggleItemCompletion use case instance
   * @param {Object} itemRepository - Implementation of IToDoItemRepository
   */
  constructor(itemRepository) {
    this.itemRepository = itemRepository;
  }

  /**
   * Executes completion status toggle
   * @param {string} itemId - Item ID to toggle
   * @param {string} userId - User ID (for ownership validation)
   * @returns {Promise<Object>} Updated item with new completion status
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

    // Toggle completion status
    const newCompletionStatus = !existingItem.isCompleted;

    // Update in repository
    const updatedItem = await this.itemRepository.updateItem(itemId, {
      isCompleted: newCompletionStatus,
      updatedAt: new Date()
    });

    return updatedItem;
  }
}

