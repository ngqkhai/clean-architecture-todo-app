import { ToDoList } from '../../../domain/entities/ToDoList.js';
import { DomainError } from '../../../domain/errors/DomainError.js';

/**
 * UpdateToDoList Use Case
 * 
 * Updates a to-do list's title with ownership validation.
 * 
 * Dependencies:
 * - IToDoListRepository (injected via constructor)
 */
export class UpdateToDoList {
  /**
   * Creates an UpdateToDoList use case instance
   * @param {Object} listRepository - Implementation of IToDoListRepository
   */
  constructor(listRepository) {
    this.listRepository = listRepository;
  }

  /**
   * Executes list update
   * @param {string} listId - List ID to update
   * @param {string} userId - User ID (for ownership validation)
   * @param {string} newTitle - New list title
   * @returns {Promise<Object>} Updated list
   * @throws {DomainError} If list not found, unauthorized, or validation fails
   */
  async execute(listId, userId, newTitle) {
    // Find existing list
    const existingList = await this.listRepository.findById(listId);
    
    if (!existingList) {
      throw new DomainError('List not found');
    }

    // Validate ownership
    if (existingList.userId !== userId) {
      throw new DomainError('Unauthorized: You do not own this list');
    }

    // Create entity instance to validate new title
    const list = new ToDoList({
      id: existingList.id,
      title: newTitle,
      userId: existingList.userId,
      createdAt: existingList.createdAt,
      updatedAt: new Date()
    });

    // Update in repository
    const updatedList = await this.listRepository.updateList(listId, {
      title: list.title,
      updatedAt: list.updatedAt
    });

    return updatedList;
  }
}

