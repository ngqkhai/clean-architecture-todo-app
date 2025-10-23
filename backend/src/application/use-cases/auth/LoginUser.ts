/**
 * LoginUser Use Case
 * Handles user authentication logic
 * This use case validates credentials and generates JWT tokens
 */

import { Email } from '@domain/value-objects/Email';
import { IUserRepository } from '@application/repositories/IUserRepository';
import { IPasswordHasher } from '@application/services/IPasswordHasher';
import { ITokenService } from '@application/services/ITokenService';

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export class LoginUser {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly tokenService: ITokenService
  ) {}

  async execute(request: LoginUserRequest): Promise<LoginUserResponse> {
    // Validate email format
    const email = Email.create(request.email);

    // Validate password is provided
    if (!request.password || request.password.length === 0) {
      throw new Error('Password is required');
    }

    // Find user by email
    const user = await this.userRepository.findByEmail(email.getValue());
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await this.passwordHasher.compare(
      request.password,
      user.passwordHash
    );

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = this.tokenService.generate(user.id, user.email);

    // Return the response
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}

