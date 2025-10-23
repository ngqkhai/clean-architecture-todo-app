import { ObjectId } from 'mongodb';
import { getDb } from './connection.js';
import { IToDoItemRepository } from '../../../application/interfaces/IToDoItemRepository.js';

/**
 * MongoToDoItemRepository - MongoDB implementation of IToDoItemRepository
 * 
 * Implements item CRUD operations using MongoDB queries.
 */
export class MongoToDoItemRepository extends IToDoItemRepository {
  constructor() {
    super();
    this.collectionName = 'todoItems';
  }

  getCollection() {
    return getDb().collection(this.collectionName);
  }

  /**
   * Creates a new to-do item
   */
  async createItem(item) {
    const collection = this.getCollection();
    
    const doc = {
      title: item.title,
      description: item.description || '',
      isCompleted: item.isCompleted || false,
      listId: new ObjectId(item.listId),
      userId: new ObjectId(item.userId),
      startDate: item.startDate || null,
      deadlineDate: item.deadlineDate || null,
      createdAt: item.createdAt || new Date(),
      updatedAt: item.updatedAt || new Date()
    };

    const result = await collection.insertOne(doc);
    
    return {
      id: result.insertedId.toString(),
      title: doc.title,
      description: doc.description,
      isCompleted: doc.isCompleted,
      listId: item.listId,
      userId: item.userId,
      startDate: doc.startDate,
      deadlineDate: doc.deadlineDate,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    };
  }

  /**
   * Finds all items for a specific list
   */
  async findAllByListId(listId) {
    const collection = this.getCollection();
    const docs = await collection
      .find({ listId: new ObjectId(listId) })
      .sort({ createdAt: 1 })
      .toArray();
    
    return docs.map(doc => this.mapDocToItem(doc));
  }

  /**
   * Finds an item by ID
   */
  async findById(id) {
    const collection = this.getCollection();
    const doc = await collection.findOne({ _id: new ObjectId(id) });
    
    if (!doc) {
      return null;
    }

    return this.mapDocToItem(doc);
  }

  /**
   * Updates an item
   */
  async updateItem(id, updates) {
    const collection = this.getCollection();
    
    const updateDoc = { $set: {} };

    if (updates.title !== undefined) updateDoc.$set.title = updates.title;
    if (updates.description !== undefined) updateDoc.$set.description = updates.description;
    if (updates.isCompleted !== undefined) updateDoc.$set.isCompleted = updates.isCompleted;
    if (updates.startDate !== undefined) updateDoc.$set.startDate = updates.startDate;
    if (updates.deadlineDate !== undefined) updateDoc.$set.deadlineDate = updates.deadlineDate;
    
    updateDoc.$set.updatedAt = updates.updatedAt || new Date();

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      updateDoc,
      { returnDocument: 'after' }
    );

    if (!result) {
      return null;
    }

    return this.mapDocToItem(result);
  }

  /**
   * Deletes an item
   */
  async deleteItem(id) {
    const collection = this.getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    return result.deletedCount > 0;
  }

  /**
   * Helper method to map MongoDB document to item object
   */
  mapDocToItem(doc) {
    return {
      id: doc._id.toString(),
      title: doc.title,
      description: doc.description,
      isCompleted: doc.isCompleted,
      listId: doc.listId.toString(),
      userId: doc.userId.toString(),
      startDate: doc.startDate,
      deadlineDate: doc.deadlineDate,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    };
  }
}

