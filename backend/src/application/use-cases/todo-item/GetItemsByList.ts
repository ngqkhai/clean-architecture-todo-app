/**
 * GetItemsByList Use Case
 * Retrieves all items in a to-do list with ownership verification
 */

import { IToDoItemRepository } from '@application/repositories/IToDoItemRepository';
import { IToDoListRepository } from '@application/repositories/IToDoListRepository';

export interface GetItemsByListRequest {
  listId: string;
  userId: string;
}

export interface ToDoItemSummary {
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

export class GetItemsByList {
  constructor(
    private readonly itemRepository: IToDoItemRepository,
    private readonly listRepository: IToDoListRepository
  ) {}

  async execute(request: GetItemsByListRequest): Promise<ToDoItemSummary[]> {
    if (!request.listId || request.listId.trim().length === 0) {
      throw new Error('List ID is required');
    }

    if (!request.userId || request.userId.trim().length === 0) {
      throw new Error('User ID is required');
    }

    // Verify the list exists and belongs to the user
    const list = await this.listRepository.findById(request.listId);
    if (!list) {
      throw new Error('To-do list not found');
    }

    if (!list.belongsTo(request.userId)) {
      throw new Error('You do not have permission to view items in this list');
    }

    const items = await this.itemRepository.findByListId(request.listId);

    return items.map(item => ({
      id: item.id,
      listId: item.listId,
      title: item.title,
      description: item.description,
      isCompleted: item.isCompleted,
      startDate: item.startDate,
      deadlineDate: item.deadlineDate,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));
  }
}

