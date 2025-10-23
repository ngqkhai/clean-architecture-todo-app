/**
 * ToggleItemCompletion Use Case
 * Toggles the completion status of a to-do item with ownership verification
 */

import { IToDoItemRepository } from '@application/repositories/IToDoItemRepository';
import { IToDoListRepository } from '@application/repositories/IToDoListRepository';

export interface ToggleItemCompletionRequest {
  itemId: string;
  userId: string;
}

export interface ToggleItemCompletionResponse {
  id: string;
  listId: string;
  title: string;
  isCompleted: boolean;
  updatedAt: Date;
}

export class ToggleItemCompletion {
  constructor(
    private readonly itemRepository: IToDoItemRepository,
    private readonly listRepository: IToDoListRepository
  ) {}

  async execute(request: ToggleItemCompletionRequest): Promise<ToggleItemCompletionResponse> {
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
      throw new Error('You do not have permission to update this item');
    }

    // Toggle completion status
    item.toggleCompletion();

    const updatedItem = await this.itemRepository.update(item);

    return {
      id: updatedItem.id,
      listId: updatedItem.listId,
      title: updatedItem.title,
      isCompleted: updatedItem.isCompleted,
      updatedAt: updatedItem.updatedAt,
    };
  }
}

