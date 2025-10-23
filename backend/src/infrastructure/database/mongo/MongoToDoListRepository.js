import { ObjectId } from 'mongodb';
import { getDb } from './connection.js';
import { IToDoListRepository } from '../../../application/interfaces/IToDoListRepository.js';

/**
 * MongoToDoListRepository - MongoDB implementation of IToDoListRepository
 * 
 * Note: MongoDB doesn't have CASCADE DELETE, so we manually delete associated items.
 */
export class MongoToDoListRepository extends IToDoListRepository {
  constructor() {
    super();
    this.collectionName = 'todoLists';
  }

  getCollection() {
    return getDb().collection(this.collectionName);
  }

  /**
   * Creates a new to-do list
   */
  async createList(list) {
    const collection = this.getCollection();
    
    const doc = {
      title: list.title,
      userId: new ObjectId(list.userId),
      createdAt: list.createdAt || new Date(),
      updatedAt: list.updatedAt || new Date()
    };

    const result = await collection.insertOne(doc);
    
    return {
      id: result.insertedId.toString(),
      title: doc.title,
      userId: list.userId,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    };
  }

  /**
   * Finds all lists for a specific user
   */
  async findAllByUserId(userId) {
    const collection = this.getCollection();
    const docs = await collection
      .find({ userId: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .toArray();
    
    return docs.map(doc => ({
      id: doc._id.toString(),
      title: doc.title,
      userId: doc.userId.toString(),
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    }));
  }

  /**
   * Finds a list by ID
   */
  async findById(id) {
    const collection = this.getCollection();
    const doc = await collection.findOne({ _id: new ObjectId(id) });
    
    if (!doc) {
      return null;
    }

    return {
      id: doc._id.toString(),
      title: doc.title,
      userId: doc.userId.toString(),
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    };
  }

  /**
   * Updates a list
   */
  async updateList(id, updates) {
    const collection = this.getCollection();
    
    const updateDoc = {
      $set: {
        title: updates.title,
        updatedAt: updates.updatedAt || new Date()
      }
    };

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      updateDoc,
      { returnDocument: 'after' }
    );

    if (!result) {
      return null;
    }

    return {
      id: result._id.toString(),
      title: result.title,
      userId: result.userId.toString(),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt
    };
  }

  /**
   * Deletes a list and all associated items (manual cascade)
   */
  async deleteList(id) {
    const collection = this.getCollection();
    const itemsCollection = getDb().collection('todoItems');
    
    // First delete all associated items
    await itemsCollection.deleteMany({ listId: new ObjectId(id) });
    
    // Then delete the list
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    return result.deletedCount > 0;
  }
}

