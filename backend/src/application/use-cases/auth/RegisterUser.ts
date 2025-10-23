/**
 * RegisterUser Use Case
 * Handles user registration logic
 * This use case orchestrates the registration flow while staying independent of infrastructure details
 */

import { User } from '@domain/entities/User';
import { Email } from '@domain/value-objects/Email';
import { Password } from '@domain/value-objects/Password';
import { IUserRepository } from '@application/repositories/IUserRepository';
import { IPasswordHasher } from '@application/services/IPasswordHasher';

export interface RegisterUserRequest {
  email: string;
  password: string;
  name: string;
}

export interface RegisterUserResponse {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export class RegisterUser {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: IPasswordHasher
  ) {}

  async execute(request: RegisterUserRequest): Promise<RegisterUserResponse> {
    // Validate email format using Email value object
    const email = Email.create(request.email);

    // Validate password using Password value object
    const password = Password.create(request.password);

    // Check if user with this email already exists
    const existingUser = await this.userRepository.findByEmail(email.getValue());
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Validate name
    if (!request.name || request.name.trim().length === 0) {
      throw new Error('Name cannot be empty');
    }
    if (request.name.length > 100) {
      throw new Error('Name cannot exceed 100 characters');
    }

    // Hash the password
    const passwordHash = await this.passwordHasher.hash(password.getValue());

    // Create the user entity
    const user = User.create({
      email: email.getValue(),
      name: request.name.trim(),
      passwordHash,
    });

    // Save the user
    const savedUser = await this.userRepository.create(user);

    // Return the response (without password hash)
    return {
      id: savedUser.id,
      email: savedUser.email,
      name: savedUser.name,
      createdAt: savedUser.createdAt,
    };
  }
}

