import dotenv from 'dotenv';

// PostgreSQL implementations
import { PostgresUserRepository } from '../database/postgres/PostgresUserRepository.js';
import { PostgresToDoListRepository } from '../database/postgres/PostgresToDoListRepository.js';
import { PostgresToDoItemRepository } from '../database/postgres/PostgresToDoItemRepository.js';

// MongoDB implementations
import { MongoUserRepository } from '../database/mongo/MongoUserRepository.js';
import { MongoToDoListRepository } from '../database/mongo/MongoToDoListRepository.js';
import { MongoToDoItemRepository } from '../database/mongo/MongoToDoItemRepository.js';

// MongoDB connection
import { connectToMongo } from '../database/mongo/connection.js';

dotenv.config();

/**
 * RepositoryFactory - THE KEY to Database Independence
 * 
 * This factory is the cornerstone of Clean Architecture's database abstraction.
 * It selects which database implementation to use based on the DB_TYPE environment variable.
 * 
 * CRITICAL PRINCIPLE:
 * - Use Cases depend on INTERFACES (IUserRepository, etc.)
 * - This factory decides which IMPLEMENTATION to inject
 * - Switching databases = change ENV variable, restart app (NO CODE CHANGES!)
 * 
 * Supported databases:
 * - "postgres" → PostgreSQL repositories
 * - "mongo" → MongoDB repositories
 */

const DB_TYPE = process.env.DB_TYPE || 'postgres';

/**
 * Creates and returns repository instances based on DB_TYPE
 * @returns {Promise<Object>} Object containing all repository instances
 */
export async function createRepositories() {
  console.log(`🔧 Initializing repositories with DB_TYPE: ${DB_TYPE}`);

  if (DB_TYPE === 'postgres') {
    console.log('✅ Using PostgreSQL repositories');
    
    return {
      userRepository: new PostgresUserRepository(),
      listRepository: new PostgresToDoListRepository(),
      itemRepository: new PostgresToDoItemRepository()
    };
  } 
  
  else if (DB_TYPE === 'mongo') {
    console.log('✅ Using MongoDB repositories');
    
    // Connect to MongoDB first
    await connectToMongo();
    
    return {
      userRepository: new MongoUserRepository(),
      listRepository: new MongoToDoListRepository(),
      itemRepository: new MongoToDoItemRepository()
    };
  } 
  
  else {
    throw new Error(
      `❌ Unsupported DB_TYPE: "${DB_TYPE}". ` +
      `Supported values are "postgres" or "mongo". ` +
      `Please check your .env file.`
    );
  }
}

/**
 * Gets the current database type
 */
export function getDatabaseType() {
  return DB_TYPE;
}

