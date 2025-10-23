/**
 * RepositoryFactory
 * Factory pattern implementation that returns the correct repository based on DB_TYPE
 * This is THE KEY component for database abstraction in Clean Architecture
 * 
 * By changing the DB_TYPE environment variable, the entire application switches databases
 * WITHOUT changing any business logic or use case code
 */

import { IUserRepository } from '@application/repositories/IUserRepository';
import { IToDoListRepository } from '@application/repositories/IToDoListRepository';
import { IToDoItemRepository } from '@application/repositories/IToDoItemRepository';

// PostgreSQL implementations
import { PostgresUserRepository } from '../postgres/PostgresUserRepository';
import { PostgresToDoListRepository } from '../postgres/PostgresToDoListRepository';
import { PostgresToDoItemRepository } from '../postgres/PostgresToDoItemRepository';

// MongoDB implementations
import { MongoUserRepository } from '../mongodb/MongoUserRepository';
import { MongoToDoListRepository } from '../mongodb/MongoToDoListRepository';
import { MongoToDoItemRepository } from '../mongodb/MongoToDoItemRepository';

export class RepositoryFactory {
  private static dbType: string = process.env.DB_TYPE || 'postgres';

  /**
   * Set the database type (useful for testing)
   */
  static setDatabaseType(type: 'postgres' | 'mongo'): void {
    this.dbType = type;
  }

  /**
   * Get the current database type
   */
  static getDatabaseType(): string {
    return this.dbType;
  }

  /**
   * Create User Repository based on DB_TYPE
   */
  static createUserRepository(): IUserRepository {
    switch (this.dbType) {
      case 'postgres':
        return new PostgresUserRepository();
      case 'mongo':
        return new MongoUserRepository();
      default:
        throw new Error(
          `Unsupported database type: ${this.dbType}. Supported types: postgres, mongo`
        );
    }
  }

  /**
   * Create ToDoList Repository based on DB_TYPE
   */
  static createToDoListRepository(): IToDoListRepository {
    switch (this.dbType) {
      case 'postgres':
        return new PostgresToDoListRepository();
      case 'mongo':
        return new MongoToDoListRepository();
      default:
        throw new Error(
          `Unsupported database type: ${this.dbType}. Supported types: postgres, mongo`
        );
    }
  }

  /**
   * Create ToDoItem Repository based on DB_TYPE
   */
  static createToDoItemRepository(): IToDoItemRepository {
    switch (this.dbType) {
      case 'postgres':
        return new PostgresToDoItemRepository();
      case 'mongo':
        return new MongoToDoItemRepository();
      default:
        throw new Error(
          `Unsupported database type: ${this.dbType}. Supported types: postgres, mongo`
        );
    }
  }
}

