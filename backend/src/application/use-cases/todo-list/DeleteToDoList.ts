/**
 * DeleteToDoList Use Case
 * Deletes a to-do list with ownership verification
 * All to-do items in the list will be cascaded deleted
 */

import { IToDoListRepository } from '@application/repositories/IToDoListRepository';

export interface DeleteToDoListRequest {
  listId: string;
  userId: string;
}

export interface DeleteToDoListResponse {
  success: boolean;
}

export class DeleteToDoList {
  constructor(private readonly listRepository: IToDoListRepository) {}

  async execute(request: DeleteToDoListRequest): Promise<DeleteToDoListResponse> {
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
      throw new Error('You do not have permission to delete this to-do list');
    }

    const deleted = await this.listRepository.delete(request.listId);

    return {
      success: deleted,
    };
  }
}

