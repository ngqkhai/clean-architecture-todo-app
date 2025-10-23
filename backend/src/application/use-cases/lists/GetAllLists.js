/**
 * GetAllLists Use Case
 * 
 * Retrieves all to-do lists belonging to a specific user.
 * 
 * Dependencies:
 * - IToDoListRepository (injected via constructor)
 */
export class GetAllLists {
  /**
   * Creates a GetAllLists use case instance
   * @param {Object} listRepository - Implementation of IToDoListRepository
   */
  constructor(listRepository) {
    this.listRepository = listRepository;
  }

  /**
   * Executes retrieval of all lists for a user
   * @param {string} userId - User ID to fetch lists for
   * @returns {Promise<Array<Object>>} Array of lists belonging to the user
   */
  async execute(userId) {
    const lists = await this.listRepository.findAllByUserId(userId);
    return lists;
  }
}

