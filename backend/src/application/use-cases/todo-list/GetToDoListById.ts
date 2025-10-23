/**
 * GetToDoListById Use Case
 * Retrieves a specific to-do list and verifies ownership
 */

import { IToDoListRepository } from '@application/repositories/IToDoListRepository';

export interface GetToDoListByIdRequest {
  listId: string;
  userId: string;
}

export interface GetToDoListByIdResponse {
  id: string;
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export class GetToDoListById {
  constructor(private readonly listRepository: IToDoListRepository) {}

  async execute(request: GetToDoListByIdRequest): Promise<GetToDoListByIdResponse> {
    if (!request.listId || request.listId.trim().length === 0) {
      throw new Error('List ID is required');
    }

    if (!request.userId || request.userId.trim().length === 0) {
      throw new Error('User ID is required');
    }

    const list = await this.listRepository.findById(request.listId);

    if (!list) {
      throw new Error('To-do list not found');
    }

    // Verify ownership
    if (!list.belongsTo(request.userId)) {
      throw new Error('You do not have permission to access this to-do list');
    }

    return {
      id: list.id,
      userId: list.userId,
      title: list.title,
      createdAt: list.createdAt,
      updatedAt: list.updatedAt,
    };
  }
}

