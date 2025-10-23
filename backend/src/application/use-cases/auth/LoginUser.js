import bcrypt from 'bcrypt';
import { DomainError } from '../../../domain/errors/DomainError.js';

/**
 * LoginUser Use Case
 * 
 * Handles user authentication by validating email and password.
 * Returns user data if credentials are valid.
 * 
 * Dependencies:
 * - IUserRepository (injected via constructor)
 * 
 * Note: JWT signing is handled in the Controller layer (infrastructure concern)
 */
export class LoginUser {
  /**
   * Creates a LoginUser use case instance
   * @param {Object} userRepository - Implementation of IUserRepository
   */
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Executes the login process
   * @param {string} email - User email
   * @param {string} password - Plain text password
   * @returns {Promise<Object>} User object if credentials are valid
   * @throws {DomainError} If credentials are invalid
   */
  async execute(email, password) {
    // Find user by email
    const user = await this.userRepository.findUserByEmail(email);
    
    if (!user) {
      throw new DomainError('Invalid email or password');
    }

    // Compare password with stored hash
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    
    if (!isPasswordValid) {
      throw new DomainError('Invalid email or password');
    }

    // Return user without password hash
    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }
}

