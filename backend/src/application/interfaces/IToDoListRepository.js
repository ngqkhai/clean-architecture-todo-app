/**
 * IToDoListRepository - Repository Interface for ToDoList Entity
 * 
 * This is a PORT in Clean Architecture that enables database independence.
 * Use Cases depend on this interface, allowing us to swap database implementations
 * without modifying any business logic.
 * 
 * Implementations:
 * - PostgresToDoListRepository (uses SQL queries)
 * - MongoToDoListRepository (uses MongoDB queries)
 */
export class IToDoListRepository {
  /**
   * Creates a new to-do list in the database
   * @param {Object} list - ToDoList entity data
   * @param {string} list.title - List title
   * @param {string} list.userId - Owner user ID
   * @returns {Promise<Object>} The created list with generated ID
   */
  async createList(list) {
    throw new Error('Method createList() must be implemented');
  }

  /**
   * Finds all lists belonging to a specific user
   * @param {string} userId - User ID to filter by
   * @returns {Promise<Array<Object>>} Array of lists belonging to the user
   */
  async findAllByUserId(userId) {
    throw new Error('Method findAllByUserId() must be implemented');
  }

  /**
   * Finds a single list by ID
   * @param {string} id - List ID to search for
   * @returns {Promise<Object|null>} List object if found, null otherwise
   */
  async findById(id) {
    throw new Error('Method findById() must be implemented');
  }

  /**
   * Updates a list's data
   * @param {string} id - List ID to update
   * @param {Object} updates - Fields to update
   * @param {string} [updates.title] - New title
   * @returns {Promise<Object>} The updated list
   */
  async updateList(id, updates) {
    throw new Error('Method updateList() must be implemented');
  }

  /**
   * Deletes a list and all its associated items (cascade delete)
   * @param {string} id - List ID to delete
   * @returns {Promise<boolean>} True if deleted successfully
   */
  async deleteList(id) {
    throw new Error('Method deleteList() must be implemented');
  }
}

