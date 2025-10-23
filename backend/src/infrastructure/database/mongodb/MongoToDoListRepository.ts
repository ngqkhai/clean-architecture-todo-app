/**
 * MongoToDoListRepository
 * MongoDB implementation of IToDoListRepository using Mongoose
 */

import { ToDoList } from '@domain/entities/ToDoList';
import { IToDoListRepository } from '@application/repositories/IToDoListRepository';
import { ToDoListModel } from './schemas/ToDoListSchema';
import { ToDoItemModel } from './schemas/ToDoItemSchema';

export class MongoToDoListRepository implements IToDoListRepository {
  async create(list: ToDoList): Promise<ToDoList> {
    const listDoc = new ToDoListModel({
      id: list.id,
      userId: list.userId,
      title: list.title,
      createdAt: list.createdAt,
      updatedAt: list.updatedAt,
    });

    await listDoc.save();
    return this.mapToEntity(listDoc);
  }

  async findAllByUserId(userId: string): Promise<ToDoList[]> {
    const listDocs = await ToDoListModel.find({ userId })
      .sort({ createdAt: -1 })
      .exec();

    return listDocs.map(doc => this.mapToEntity(doc));
  }

  async findById(id: string): Promise<ToDoList | null> {
    const listDoc = await ToDoListModel.findOne({ id });

    if (!listDoc) {
      return null;
    }

    return this.mapToEntity(listDoc);
  }

  async update(list: ToDoList): Promise<ToDoList> {
    const listDoc = await ToDoListModel.findOneAndUpdate(
      { id: list.id },
      {
        title: list.title,
        updatedAt: list.updatedAt,
      },
      { new: true, runValidators: true }
    );

    if (!listDoc) {
      throw new Error('ToDoList not found');
    }

    return this.mapToEntity(listDoc);
  }

  async delete(id: string): Promise<boolean> {
    // First delete all items in the list (cascade delete)
    await ToDoItemModel.deleteMany({ listId: id });
    
    // Then delete the list itself
    const result = await ToDoListModel.deleteOne({ id });
    return result.deletedCount > 0;
  }

  private mapToEntity(doc: any): ToDoList {
    return ToDoList.reconstitute({
      id: doc.id,
      userId: doc.userId,
      title: doc.title,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }
}

