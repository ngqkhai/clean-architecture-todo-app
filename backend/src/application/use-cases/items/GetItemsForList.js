import { DomainError } from '../../../domain/errors/DomainError.js';

/**
 * GetItemsForList Use Case
 * 
 * Retrieves all items belonging to a specific list.
 * Validates list ownership before returning items.
 * 
 * Dependencies:
 * - IToDoItemRepository (injected via constructor)
 * - IToDoListRepository (injected via constructor)
 */
export class GetItemsForList {
  /**
   * Creates a GetItemsForList use case instance
   * @param {Object} itemRepository - Implementation of IToDoItemRepository
   * @param {Object} listRepository - Implementation of IToDoListRepository
   */
  constructor(itemRepository, listRepository) {
    this.itemRepository = itemRepository;
    this.listRepository = listRepository;
  }

  /**
   * Executes retrieval of items for a list
   * @param {string} listId - List ID to fetch items for
   * @param {string} userId - User ID (for ownership validation)
   * @returns {Promise<Array<Object>>} Array of items in the list
   * @throws {DomainError} If list not found or unauthorized
   */
  async execute(listId, userId) {
    // Validate list exists and user owns it
    const list = await this.listRepository.findById(listId);
    
    if (!list) {
      throw new DomainError('List not found');
    }

    if (list.userId !== userId) {
      throw new DomainError('Unauthorized: You do not own this list');
    }

    // Fetch items
    const items = await this.itemRepository.findAllByListId(listId);
    
    return items;
  }
}

