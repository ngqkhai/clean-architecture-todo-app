import { DomainError } from '../errors/DomainError.js';

/**
 * ToDoItem Entity - Represents a single to-do item
 * 
 * This is the core entity for managing individual tasks.
 * It enforces critical business rules including date validation.
 * 
 * Business Rules:
 * - Title is required and cannot exceed 200 characters
 * - Description is optional but cannot exceed 1000 characters
 * - **CRITICAL: Deadline date must not be before start date**
 * - isCompleted defaults to false
 */
export class ToDoItem {
  /**
   * Creates a ToDoItem instance
   * @param {Object} params - ToDoItem parameters
   * @param {string} params.id - Unique identifier
   * @param {string} params.title - Item title
   * @param {string} [params.description] - Item description (optional)
   * @param {boolean} [params.isCompleted] - Completion status
   * @param {string} params.listId - ID of the parent ToDoList
   * @param {string} params.userId - ID of the owner user
   * @param {Date} [params.startDate] - Start date (optional)
   * @param {Date} [params.deadlineDate] - Deadline date (optional)
   * @param {Date} [params.createdAt] - Creation timestamp
   * @param {Date} [params.updatedAt] - Last update timestamp
   */
  constructor({
    id,
    title,
    description = '',
    isCompleted = false,
    listId,
    userId,
    startDate = null,
    deadlineDate = null,
    createdAt,
    updatedAt
  }) {
    this.id = id;
    this.title = title;
    this.description = description || '';
    this.isCompleted = isCompleted;
    this.listId = listId;
    this.userId = userId;
    this.startDate = startDate;
    this.deadlineDate = deadlineDate;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
    
    // Validate on construction
    this.validateTitle();
    this.validateDescription();
    this.validateDates();
  }

  /**
   * Validates the title according to business rules
   * @throws {DomainError} If title is invalid
   */
  validateTitle() {
    if (!this.title || typeof this.title !== 'string') {
      throw new DomainError('Title is required and must be a string');
    }
    
    const trimmedTitle = this.title.trim();
    
    if (trimmedTitle.length === 0) {
      throw new DomainError('Title cannot be empty');
    }
    
    if (trimmedTitle.length > 200) {
      throw new DomainError('Title must not exceed 200 characters');
    }
  }

  /**
   * Validates the description according to business rules
   * @throws {DomainError} If description is invalid
   */
  validateDescription() {
    if (this.description && typeof this.description !== 'string') {
      throw new DomainError('Description must be a string');
    }
    
    if (this.description && this.description.length > 1000) {
      throw new DomainError('Description must not exceed 1000 characters');
    }
  }

  /**
   * Validates date relationships - CRITICAL BUSINESS RULE
   * Ensures deadline date is not before start date
   * @throws {DomainError} If dates are invalid
   */
  validateDates() {
    // If both dates are provided, deadline must not be before start date
    if (this.startDate && this.deadlineDate) {
      const start = new Date(this.startDate);
      const deadline = new Date(this.deadlineDate);
      
      if (deadline < start) {
        throw new DomainError('Deadline date cannot be before start date');
      }
    }
  }

  /**
   * Factory method to create a new ToDoItem
   * @param {Object} params - Item parameters
   * @param {string} params.title - Item title
   * @param {string} params.listId - Parent list ID
   * @param {string} params.userId - Owner user ID
   * @param {string} [params.description] - Description
   * @param {Date} [params.startDate] - Start date
   * @param {Date} [params.deadlineDate] - Deadline date
   * @param {string} [params.id] - Optional ID
   * @returns {ToDoItem} New ToDoItem instance
   */
  static create({ title, listId, userId, description = '', startDate = null, deadlineDate = null, id = null }) {
    return new ToDoItem({
      id,
      title: title.trim(),
      description: description?.trim() || '',
      isCompleted: false,
      listId,
      userId,
      startDate,
      deadlineDate,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  /**
   * Toggles the completion status of the item
   * @returns {boolean} New completion status
   */
  toggleCompletion() {
    this.isCompleted = !this.isCompleted;
    this.updatedAt = new Date();
    return this.isCompleted;
  }

  /**
   * Updates the item details
   * @param {Object} updates - Fields to update
   * @param {string} [updates.title] - New title
   * @param {string} [updates.description] - New description
   * @param {Date} [updates.startDate] - New start date
   * @param {Date} [updates.deadlineDate] - New deadline date
   */
  update({ title, description, startDate, deadlineDate }) {
    if (title !== undefined) {
      this.title = title.trim();
      this.validateTitle();
    }
    
    if (description !== undefined) {
      this.description = description.trim();
      this.validateDescription();
    }
    
    if (startDate !== undefined) {
      this.startDate = startDate;
    }
    
    if (deadlineDate !== undefined) {
      this.deadlineDate = deadlineDate;
    }
    
    // Re-validate dates after update
    this.validateDates();
    
    this.updatedAt = new Date();
  }

  /**
   * Converts the ToDoItem entity to a plain object
   * @returns {Object} Plain object representation
   */
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      isCompleted: this.isCompleted,
      listId: this.listId,
      userId: this.userId,
      startDate: this.startDate,
      deadlineDate: this.deadlineDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

