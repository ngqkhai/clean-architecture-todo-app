/**
 * MongoToDoItemRepository
 * MongoDB implementation of IToDoItemRepository using Mongoose
 */

import { ToDoItem } from '@domain/entities/ToDoItem';
import { IToDoItemRepository } from '@application/repositories/IToDoItemRepository';
import { ToDoItemModel } from './schemas/ToDoItemSchema';

export class MongoToDoItemRepository implements IToDoItemRepository {
  async create(item: ToDoItem): Promise<ToDoItem> {
    const itemDoc = new ToDoItemModel({
      id: item.id,
      listId: item.listId,
      title: item.title,
      description: item.description,
      isCompleted: item.isCompleted,
      startDate: item.startDate,
      deadlineDate: item.deadlineDate,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    });

    await itemDoc.save();
    return this.mapToEntity(itemDoc);
  }

  async findByListId(listId: string): Promise<ToDoItem[]> {
    const itemDocs = await ToDoItemModel.find({ listId })
      .sort({ createdAt: 1 })
      .exec();

    return itemDocs.map(doc => this.mapToEntity(doc));
  }

  async findById(id: string): Promise<ToDoItem | null> {
    const itemDoc = await ToDoItemModel.findOne({ id });

    if (!itemDoc) {
      return null;
    }

    return this.mapToEntity(itemDoc);
  }

  async update(item: ToDoItem): Promise<ToDoItem> {
    const itemDoc = await ToDoItemModel.findOneAndUpdate(
      { id: item.id },
      {
        title: item.title,
        description: item.description,
        isCompleted: item.isCompleted,
        startDate: item.startDate,
        deadlineDate: item.deadlineDate,
        updatedAt: item.updatedAt,
      },
      { new: true, runValidators: true }
    );

    if (!itemDoc) {
      throw new Error('ToDoItem not found');
    }

    return this.mapToEntity(itemDoc);
  }

  async delete(id: string): Promise<boolean> {
    const result = await ToDoItemModel.deleteOne({ id });
    return result.deletedCount > 0;
  }

  private mapToEntity(doc: any): ToDoItem {
    return ToDoItem.reconstitute({
      id: doc.id,
      listId: doc.listId,
      title: doc.title,
      description: doc.description,
      isCompleted: doc.isCompleted,
      startDate: doc.startDate,
      deadlineDate: doc.deadlineDate,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }
}

