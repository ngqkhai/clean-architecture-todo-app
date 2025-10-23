import { ObjectId } from 'mongodb';
import { getDb } from './connection.js';
import { IUserRepository } from '../../../application/interfaces/IUserRepository.js';

/**
 * MongoUserRepository - MongoDB implementation of IUserRepository
 * 
 * Implements the same interface as PostgresUserRepository but uses MongoDB.
 * This demonstrates database independence in Clean Architecture.
 */
export class MongoUserRepository extends IUserRepository {
  constructor() {
    super();
    this.collectionName = 'users';
  }

  getCollection() {
    return getDb().collection(this.collectionName);
  }

  /**
   * Creates a new user in MongoDB
   */
  async createUser(user) {
    const collection = this.getCollection();
    
    const doc = {
      email: user.email,
      passwordHash: user.passwordHash,
      createdAt: user.createdAt || new Date(),
      updatedAt: user.updatedAt || new Date()
    };

    const result = await collection.insertOne(doc);
    
    return {
      id: result.insertedId.toString(),
      email: doc.email,
      passwordHash: doc.passwordHash,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    };
  }

  /**
   * Finds a user by email
   */
  async findUserByEmail(email) {
    const collection = this.getCollection();
    const doc = await collection.findOne({ email });
    
    if (!doc) {
      return null;
    }

    return {
      id: doc._id.toString(),
      email: doc.email,
      passwordHash: doc.passwordHash,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    };
  }

  /**
   * Finds a user by ID
   */
  async findUserById(id) {
    const collection = this.getCollection();
    const doc = await collection.findOne({ _id: new ObjectId(id) });
    
    if (!doc) {
      return null;
    }

    return {
      id: doc._id.toString(),
      email: doc.email,
      passwordHash: doc.passwordHash,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    };
  }
}

