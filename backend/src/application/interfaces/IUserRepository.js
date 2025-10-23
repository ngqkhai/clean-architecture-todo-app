/**
 * IUserRepository - Repository Interface for User Entity
 * 
 * This is a PORT in Clean Architecture (Hexagonal Architecture).
 * It defines the contract that any User repository implementation must follow.
 * 
 * KEY PRINCIPLE: Use Cases depend on this INTERFACE, not on concrete implementations.
 * This allows us to swap between PostgreSQL and MongoDB without changing business logic.
 * 
 * Implementations:
 * - PostgresUserRepository (in infrastructure/database/postgres)
 * - MongoUserRepository (in infrastructure/database/mongo)
 */
export class IUserRepository {
  /**
   * Creates a new user in the database
   * @param {Object} user - User entity data
   * @param {string} user.email - User email
   * @param {string} user.passwordHash - Hashed password
   * @returns {Promise<Object>} The created user with generated ID
   * @throws {Error} If email already exists or database error occurs
   */
  async createUser(user) {
    throw new Error('Method createUser() must be implemented');
  }

  /**
   * Finds a user by email address
   * @param {string} email - User email to search for
   * @returns {Promise<Object|null>} User object if found, null otherwise
   */
  async findUserByEmail(email) {
    throw new Error('Method findUserByEmail() must be implemented');
  }

  /**
   * Finds a user by ID
   * @param {string} id - User ID to search for
   * @returns {Promise<Object|null>} User object if found, null otherwise
   */
  async findUserById(id) {
    throw new Error('Method findUserById() must be implemented');
  }
}

