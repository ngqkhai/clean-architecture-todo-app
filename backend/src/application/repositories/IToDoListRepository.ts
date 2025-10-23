/**
 * IToDoListRepository Interface
 * Defines the contract for ToDoList data access
 * This interface belongs to the Application Layer
 * Concrete implementations will be in the Infrastructure Layer
 */

import { ToDoList } from '@domain/entities/ToDoList';

export interface IToDoListRepository {
  /**
   * Create a new to-do list in the database
   * @param list - The to-do list entity to create
   * @returns The created to-do list
   */
  create(list: ToDoList): Promise<ToDoList>;

  /**
   * Find all to-do lists belonging to a specific user
   * @param userId - The ID of the user who owns the lists
   * @returns Array of to-do lists owned by the user
   */
  findAllByUserId(userId: string): Promise<ToDoList[]>;

  /**
   * Find a to-do list by its ID
   * @param id - The to-do list ID to search for
   * @returns The to-do list if found, null otherwise
   */
  findById(id: string): Promise<ToDoList | null>;

  /**
   * Update an existing to-do list
   * @param list - The to-do list entity with updated data
   * @returns The updated to-do list
   */
  update(list: ToDoList): Promise<ToDoList>;

  /**
   * Delete a to-do list by its ID
   * All to-do items belonging to this list should be deleted (cascade)
   * @param id - The ID of the to-do list to delete
   * @returns True if deleted, false otherwise
   */
  delete(id: string): Promise<boolean>;
}

