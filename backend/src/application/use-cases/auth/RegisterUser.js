import bcrypt from 'bcrypt';
import { User } from '../../../domain/entities/User.js';
import { DomainError } from '../../../domain/errors/DomainError.js';

/**
 * RegisterUser Use Case
 * 
 * Handles new user registration with password hashing and email uniqueness validation.
 * This use case orchestrates the business logic without depending on external frameworks.
 * 
 * Dependencies:
 * - IUserRepository (injected via constructor)
 */
export class RegisterUser {
  /**
   * Creates a RegisterUser use case instance
   * @param {Object} userRepository - Implementation of IUserRepository
   */
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Executes the registration process
   * @param {string} email - User email
   * @param {string} password - Plain text password (will be hashed)
   * @returns {Promise<Object>} Created user (without password hash)
   * @throws {DomainError} If email already exists or validation fails
   */
  async execute(email, password) {
    // Validate password length
    if (!password || password.length < 8) {
      throw new DomainError('Password must be at least 8 characters long');
    }

    // Check if email already exists
    const existingUser = await this.userRepository.findUserByEmail(email);
    if (existingUser) {
      throw new DomainError('Email already registered');
    }

    // Hash password with bcrypt (salt rounds: 10)
    const passwordHash = await bcrypt.hash(password, 10);

    // Create User entity (validates email format)
    const user = User.create(email, passwordHash);

    // Persist user
    const createdUser = await this.userRepository.createUser({
      email: user.email,
      passwordHash: user.passwordHash,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });

    // Return user without password hash for security
    return {
      id: createdUser.id,
      email: createdUser.email,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt
    };
  }
}

