/**
 * CreateToDoItem Use Case
 * Creates a new to-do item in a list with ownership verification
 */

import { ToDoItem } from '@domain/entities/ToDoItem';
import { IToDoItemRepository } from '@application/repositories/IToDoItemRepository';
import { IToDoListRepository } from '@application/repositories/IToDoListRepository';

export interface CreateToDoItemRequest {
  listId: string;
  userId: string;
  title: string;
  description?: string | null;
  startDate?: Date | null;
  deadlineDate?: Date | null;
}

export interface CreateToDoItemResponse {
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

export class CreateToDoItem {
  constructor(
    private readonly itemRepository: IToDoItemRepository,
    private readonly listRepository: IToDoListRepository
  ) {}

  async execute(request: CreateToDoItemRequest): Promise<CreateToDoItemResponse> {
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
      throw new Error('You do not have permission to add items to this list');
    }

    // Create the item (entity will validate title, description, and date range)
    const item = ToDoItem.create({
      listId: request.listId,
      title: request.title,
      description: request.description || null,
      startDate: request.startDate || null,
      deadlineDate: request.deadlineDate || null,
    });

    const savedItem = await this.itemRepository.create(item);

    return {
      id: savedItem.id,
      listId: savedItem.listId,
      title: savedItem.title,
      description: savedItem.description,
      isCompleted: savedItem.isCompleted,
      startDate: savedItem.startDate,
      deadlineDate: savedItem.deadlineDate,
      createdAt: savedItem.createdAt,
      updatedAt: savedItem.updatedAt,
    };
  }
}

