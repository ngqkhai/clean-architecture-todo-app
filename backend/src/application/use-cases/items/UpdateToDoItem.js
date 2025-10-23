import { ToDoItem } from '../../../domain/entities/ToDoItem.js';
import { DomainError } from '../../../domain/errors/DomainError.js';

/**
 * UpdateToDoItem Use Case
 * 
 * Updates a to-do item's data with ownership validation.
 * Re-validates date business rules after update.
 * 
 * Dependencies:
 * - IToDoItemRepository (injected via constructor)
 */
export class UpdateToDoItem {
  /**
   * Creates an UpdateToDoItem use case instance
   * @param {Object} itemRepository - Implementation of IToDoItemRepository
   */
  constructor(itemRepository) {
    this.itemRepository = itemRepository;
  }

  /**
   * Executes item update
   * @param {string} itemId - Item ID to update
   * @param {string} userId - User ID (for ownership validation)
   * @param {Object} updates - Fields to update
   * @param {string} [updates.title] - New title
   * @param {string} [updates.description] - New description
   * @param {Date} [updates.startDate] - New start date
   * @param {Date} [updates.deadlineDate] - New deadline date
   * @returns {Promise<Object>} Updated item
   * @throws {DomainError} If item not found, unauthorized, or validation fails
   */
  async execute(itemId, userId, updates) {
    // Find existing item
    const existingItem = await this.itemRepository.findById(itemId);
    
    if (!existingItem) {
      throw new DomainError('Item not found');
    }

    // Validate ownership
    if (existingItem.userId !== userId) {
      throw new DomainError('Unauthorized: You do not own this item');
    }

    // Create entity instance with updates to re-validate business rules
    const item = new ToDoItem({
      ...existingItem,
      title: updates.title !== undefined ? updates.title : existingItem.title,
      description: updates.description !== undefined ? updates.description : existingItem.description,
      startDate: updates.startDate !== undefined ? updates.startDate : existingItem.startDate,
      deadlineDate: updates.deadlineDate !== undefined ? updates.deadlineDate : existingItem.deadlineDate,
      updatedAt: new Date()
    });

    // Update in repository
    const updatedItem = await this.itemRepository.updateItem(itemId, {
      title: item.title,
      description: item.description,
      startDate: item.startDate,
      deadlineDate: item.deadlineDate,
      updatedAt: item.updatedAt
    });

    return updatedItem;
  }
}

