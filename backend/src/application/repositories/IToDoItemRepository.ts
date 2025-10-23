/**
 * IToDoItemRepository Interface
 * Defines the contract for ToDoItem data access
 * This interface belongs to the Application Layer
 * Concrete implementations will be in the Infrastructure Layer
 */

import { ToDoItem } from '@domain/entities/ToDoItem';

export interface IToDoItemRepository {
  /**
   * Create a new to-do item in the database
   * @param item - The to-do item entity to create
   * @returns The created to-do item
   */
  create(item: ToDoItem): Promise<ToDoItem>;

  /**
   * Find all to-do items belonging to a specific list
   * @param listId - The ID of the list that contains the items
   * @returns Array of to-do items in the list
   */
  findByListId(listId: string): Promise<ToDoItem[]>;

  /**
   * Find a to-do item by its ID
   * @param id - The to-do item ID to search for
   * @returns The to-do item if found, null otherwise
   */
  findById(id: string): Promise<ToDoItem | null>;

  /**
   * Update an existing to-do item
   * @param item - The to-do item entity with updated data
   * @returns The updated to-do item
   */
  update(item: ToDoItem): Promise<ToDoItem>;

  /**
   * Delete a to-do item by its ID
   * @param id - The ID of the to-do item to delete
   * @returns True if deleted, false otherwise
   */
  delete(id: string): Promise<boolean>;
}

