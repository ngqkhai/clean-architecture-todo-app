/**
 * GetAllToDoListsByUser Use Case
 * Retrieves all to-do lists belonging to a specific user
 */

import { IToDoListRepository } from '@application/repositories/IToDoListRepository';

export interface GetAllToDoListsByUserRequest {
  userId: string;
}

export interface ToDoListSummary {
  id: string;
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export class GetAllToDoListsByUser {
  constructor(private readonly listRepository: IToDoListRepository) {}

  async execute(request: GetAllToDoListsByUserRequest): Promise<ToDoListSummary[]> {
    if (!request.userId || request.userId.trim().length === 0) {
      throw new Error('User ID is required');
    }

    const lists = await this.listRepository.findAllByUserId(request.userId);

    return lists.map(list => ({
      id: list.id,
      userId: list.userId,
      title: list.title,
      createdAt: list.createdAt,
      updatedAt: list.updatedAt,
    }));
  }
}

