/**
 * IToDoItemRepository - Repository Interface for ToDoItem Entity
 * 
 * This PORT defines the contract for persisting and retrieving to-do items.
 * By depending on this interface (not concrete implementations), Use Cases
 * remain database-agnostic and testable.
 * 
 * Implementations:
 * - PostgresToDoItemRepository (SQL-based)
 * - MongoToDoItemRepository (Document-based)
 */
export class IToDoItemRepository {
  /**
   * Creates a new to-do item in the database
   * @param {Object} item - ToDoItem entity data
   * @param {string} item.title - Item title
   * @param {string} [item.description] - Item description
   * @param {boolean} [item.isCompleted] - Completion status
   * @param {string} item.listId - Parent list ID
   * @param {string} item.userId - Owner user ID
   * @param {Date} [item.startDate] - Start date
   * @param {Date} [item.deadlineDate] - Deadline date
   * @returns {Promise<Object>} The created item with generated ID
   */
  async createItem(item) {
    throw new Error('Method createItem() must be implemented');
  }

  /**
   * Finds all items belonging to a specific list
   * @param {string} listId - List ID to filter by
   * @returns {Promise<Array<Object>>} Array of items in the list
   */
  async findAllByListId(listId) {
    throw new Error('Method findAllByListId() must be implemented');
  }

  /**
   * Finds a single item by ID
   * @param {string} id - Item ID to search for
   * @returns {Promise<Object|null>} Item object if found, null otherwise
   */
  async findById(id) {
    throw new Error('Method findById() must be implemented');
  }

  /**
   * Updates an item's data
   * @param {string} id - Item ID to update
   * @param {Object} updates - Fields to update
   * @param {string} [updates.title] - New title
   * @param {string} [updates.description] - New description
   * @param {boolean} [updates.isCompleted] - New completion status
   * @param {Date} [updates.startDate] - New start date
   * @param {Date} [updates.deadlineDate] - New deadline date
   * @returns {Promise<Object>} The updated item
   */
  async updateItem(id, updates) {
    throw new Error('Method updateItem() must be implemented');
  }

  /**
   * Deletes an item
   * @param {string} id - Item ID to delete
   * @returns {Promise<boolean>} True if deleted successfully
   */
  async deleteItem(id) {
    throw new Error('Method deleteItem() must be implemented');
  }
}

