/**
 * DeleteToDoItem Use Case
 * Deletes a to-do item with ownership verification
 */

import { IToDoItemRepository } from '@application/repositories/IToDoItemRepository';
import { IToDoListRepository } from '@application/repositories/IToDoListRepository';

export interface DeleteToDoItemRequest {
  itemId: string;
  userId: string;
}

export interface DeleteToDoItemResponse {
  success: boolean;
}

export class DeleteToDoItem {
  constructor(
    private readonly itemRepository: IToDoItemRepository,
    private readonly listRepository: IToDoListRepository
  ) {}

  async execute(request: DeleteToDoItemRequest): Promise<DeleteToDoItemResponse> {
    if (!request.itemId || request.itemId.trim().length === 0) {
      throw new Error('Item ID is required');
    }

    if (!request.userId || request.userId.trim().length === 0) {
      throw new Error('User ID is required');
    }

    const item = await this.itemRepository.findById(request.itemId);
    if (!item) {
      throw new Error('To-do item not found');
    }

    // Verify the parent list belongs to the user
    const list = await this.listRepository.findById(item.listId);
    if (!list) {
      throw new Error('Parent to-do list not found');
    }

    if (!list.belongsTo(request.userId)) {
      throw new Error('You do not have permission to delete this item');
    }

    const deleted = await this.itemRepository.delete(request.itemId);

    return {
      success: deleted,
    };
  }
}

