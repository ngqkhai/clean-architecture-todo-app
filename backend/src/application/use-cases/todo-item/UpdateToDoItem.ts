/**
 * UpdateToDoItem Use Case
 * Updates a to-do item with ownership verification
 */

import { IToDoItemRepository } from '@application/repositories/IToDoItemRepository';
import { IToDoListRepository } from '@application/repositories/IToDoListRepository';

export interface UpdateToDoItemRequest {
  itemId: string;
  userId: string;
  title?: string;
  description?: string | null;
  startDate?: Date | null;
  deadlineDate?: Date | null;
}

export interface UpdateToDoItemResponse {
  id: string;
  listId: string;
  title: string;
  description: string | null;
  isCompleted: boolean;
  startDate: Date | null;
  deadlineDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export class UpdateToDoItem {
  constructor(
    private readonly itemRepository: IToDoItemRepository,
    private readonly listRepository: IToDoListRepository
  ) {}

  async execute(request: UpdateToDoItemRequest): Promise<UpdateToDoItemResponse> {
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

    // Update fields if provided
    if (request.title !== undefined) {
      item.updateTitle(request.title);
    }

    if (request.description !== undefined) {
      item.updateDescription(request.description);
    }

    if (request.startDate !== undefined || request.deadlineDate !== undefined) {
      const newStartDate = request.startDate !== undefined ? request.startDate : item.startDate;
      const newDeadlineDate = request.deadlineDate !== undefined ? request.deadlineDate : item.deadlineDate;
      item.updateDates(newStartDate, newDeadlineDate);
    }

    const updatedItem = await this.itemRepository.update(item);

    return {
      id: updatedItem.id,
      listId: updatedItem.listId,
      title: updatedItem.title,
      description: updatedItem.description,
      isCompleted: updatedItem.isCompleted,
      startDate: updatedItem.startDate,
      deadlineDate: updatedItem.deadlineDate,
      createdAt: updatedItem.createdAt,
      updatedAt: updatedItem.updatedAt,
    };
  }
}

