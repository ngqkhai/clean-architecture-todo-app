/**
 * UpdateToDoList Use Case
 * Updates a to-do list's title with ownership verification
 */

import { IToDoListRepository } from '@application/repositories/IToDoListRepository';

export interface UpdateToDoListRequest {
  listId: string;
  userId: string;
  title: string;
}

export interface UpdateToDoListResponse {
  id: string;
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UpdateToDoList {
  constructor(private readonly listRepository: IToDoListRepository) {}

  async execute(request: UpdateToDoListRequest): Promise<UpdateToDoListResponse> {
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
      throw new Error('You do not have permission to update this to-do list');
    }

    // Update the title (entity validates the new title)
    list.updateTitle(request.title);

    const updatedList = await this.listRepository.update(list);

    return {
      id: updatedList.id,
      userId: updatedList.userId,
      title: updatedList.title,
      createdAt: updatedList.createdAt,
      updatedAt: updatedList.updatedAt,
    };
  }
}

