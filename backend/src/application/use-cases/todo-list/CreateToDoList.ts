/**
 * CreateToDoList Use Case
 * Handles creating a new to-do list for a user
 */

import { ToDoList } from '@domain/entities/ToDoList';
import { IToDoListRepository } from '@application/repositories/IToDoListRepository';

export interface CreateToDoListRequest {
  userId: string;
  title: string;
}

export interface CreateToDoListResponse {
  id: string;
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export class CreateToDoList {
  constructor(private readonly listRepository: IToDoListRepository) {}

  async execute(request: CreateToDoListRequest): Promise<CreateToDoListResponse> {
    if (!request.userId || request.userId.trim().length === 0) {
      throw new Error('User ID is required');
    }

    // The ToDoList entity will validate the title
    const list = ToDoList.create({
      userId: request.userId,
      title: request.title,
    });

    const savedList = await this.listRepository.create(list);

    return {
      id: savedList.id,
      userId: savedList.userId,
      title: savedList.title,
      createdAt: savedList.createdAt,
      updatedAt: savedList.updatedAt,
    };
  }
}

