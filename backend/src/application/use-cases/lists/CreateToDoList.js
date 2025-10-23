import { ToDoList } from '../../../domain/entities/ToDoList.js';

/**
 * CreateToDoList Use Case
 * 
 * Creates a new to-do list for a user.
 * Validates the list title through the domain entity.
 * 
 * Dependencies:
 * - IToDoListRepository (injected via constructor)
 */
export class CreateToDoList {
  /**
   * Creates a CreateToDoList use case instance
   * @param {Object} listRepository - Implementation of IToDoListRepository
   */
  constructor(listRepository) {
    this.listRepository = listRepository;
  }

  /**
   * Executes list creation
   * @param {string} title - List title
   * @param {string} userId - Owner user ID
   * @returns {Promise<Object>} Created list
   * @throws {DomainError} If title validation fails
   */
  async execute(title, userId) {
    // Create ToDoList entity (validates title)
    const list = ToDoList.create(title, userId);

    // Persist list
    const createdList = await this.listRepository.createList({
      title: list.title,
      userId: list.userId,
      createdAt: list.createdAt,
      updatedAt: list.updatedAt
    });

    return createdList;
  }
}

