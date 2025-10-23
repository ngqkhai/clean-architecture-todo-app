/**
 * MongoUserRepository
 * MongoDB implementation of IUserRepository using Mongoose
 */

import { User } from '@domain/entities/User';
import { IUserRepository } from '@application/repositories/IUserRepository';
import { UserModel } from './schemas/UserSchema';

export class MongoUserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    const userDoc = new UserModel({
      id: user.id,
      email: user.email,
      passwordHash: user.passwordHash,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });

    await userDoc.save();
    return this.mapToEntity(userDoc);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userDoc = await UserModel.findOne({ email: email.toLowerCase() });
    
    if (!userDoc) {
      return null;
    }

    return this.mapToEntity(userDoc);
  }

  async findById(id: string): Promise<User | null> {
    const userDoc = await UserModel.findOne({ id });

    if (!userDoc) {
      return null;
    }

    return this.mapToEntity(userDoc);
  }

  async update(user: User): Promise<User> {
    const userDoc = await UserModel.findOneAndUpdate(
      { id: user.id },
      {
        email: user.email,
        passwordHash: user.passwordHash,
        name: user.name,
        updatedAt: user.updatedAt,
      },
      { new: true, runValidators: true }
    );

    if (!userDoc) {
      throw new Error('User not found');
    }

    return this.mapToEntity(userDoc);
  }

  async delete(id: string): Promise<boolean> {
    const result = await UserModel.deleteOne({ id });
    return result.deletedCount > 0;
  }

  private mapToEntity(doc: any): User {
    return User.reconstitute({
      id: doc.id,
      email: doc.email,
      passwordHash: doc.passwordHash,
      name: doc.name,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }
}

