import { ToDoItem } from '../../../domain/entities/ToDoItem.js';
import { DomainError } from '../../../domain/errors/DomainError.js';

/**
 * CreateToDoItem Use Case
 * 
 * Creates a new to-do item within a list.
 * Validates list ownership and enforces date business rules.
 * 
 * Dependencies:
 * - IToDoItemRepository (injected via constructor)
 * - IToDoListRepository (injected via constructor)
 */
export class CreateToDoItem {
  /**
   * Creates a CreateToDoItem use case instance
   * @param {Object} itemRepository - Implementation of IToDoItemRepository
   * @param {Object} listRepository - Implementation of IToDoListRepository
   */
  constructor(itemRepository, listRepository) {
    this.itemRepository = itemRepository;
    this.listRepository = listRepository;
  }

  /**
   * Executes item creation
   * @param {string} listId - Parent list ID
   * @param {string} userId - User ID (for ownership validation)
   * @param {Object} itemData - Item data
   * @param {string} itemData.title - Item title
   * @param {string} [itemData.description] - Item description
   * @param {Date} [itemData.startDate] - Start date
   * @param {Date} [itemData.deadlineDate] - Deadline date
   * @returns {Promise<Object>} Created item
   * @throws {DomainError} If list not found, unauthorized, or validation fails
   */
  async execute(listId, userId, itemData) {
    // Validate list exists and user owns it
    const list = await this.listRepository.findById(listId);
    
    if (!list) {
      throw new DomainError('List not found');
    }

    if (list.userId !== userId) {
      throw new DomainError('Unauthorized: You do not own this list');
    }

    // Create ToDoItem entity (validates title, description, and dates)
    const item = ToDoItem.create({
      title: itemData.title,
      description: itemData.description,
      startDate: itemData.startDate,
      deadlineDate: itemData.deadlineDate,
      listId,
      userId
    });

    // Persist item
    const createdItem = await this.itemRepository.createItem({
      title: item.title,
      description: item.description,
      isCompleted: item.isCompleted,
      listId: item.listId,
      userId: item.userId,
      startDate: item.startDate,
      deadlineDate: item.deadlineDate,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    });

    return createdItem;
  }
}

