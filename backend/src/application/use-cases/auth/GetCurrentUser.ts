/**
 * GetCurrentUser Use Case
 * Retrieves the currently authenticated user's information
 */

import { IUserRepository } from '@application/repositories/IUserRepository';

export interface GetCurrentUserRequest {
  userId: string;
}

export interface GetCurrentUserResponse {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export class GetCurrentUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(request: GetCurrentUserRequest): Promise<GetCurrentUserResponse> {
    if (!request.userId || request.userId.trim().length === 0) {
      throw new Error('User ID is required');
    }

    const user = await this.userRepository.findById(request.userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };
  }
}

