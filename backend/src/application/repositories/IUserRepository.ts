/**
 * IUserRepository Interface
 * Defines the contract for User data access
 * This interface belongs to the Application Layer
 * Concrete implementations will be in the Infrastructure Layer
 */

import { User } from '@domain/entities/User';

export interface IUserRepository {
  /**
   * Create a new user in the database
   * @param user - The user entity to create
   * @returns The created user
   */
  create(user: User): Promise<User>;

  /**
   * Find a user by their email address
   * @param email - The email to search for
   * @returns The user if found, null otherwise
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Find a user by their ID
   * @param id - The user ID to search for
   * @returns The user if found, null otherwise
   */
  findById(id: string): Promise<User | null>;

  /**
   * Update an existing user
   * @param user - The user entity with updated data
   * @returns The updated user
   */
  update(user: User): Promise<User>;

  /**
   * Delete a user by their ID
   * @param id - The ID of the user to delete
   * @returns True if deleted, false otherwise
   */
  delete(id: string): Promise<boolean>;
}

