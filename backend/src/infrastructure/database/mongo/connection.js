import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://todouser:todopass@localhost:27017/tododb?authSource=admin';
const DB_NAME = process.env.MONGO_DB_NAME || 'tododb';

let client = null;
let db = null;

/**
 * MongoDB Connection Manager
 * 
 * Creates and manages a single MongoDB client connection.
 * Provides access to the database instance.
 */

/**
 * Connects to MongoDB and returns the database instance
 */
export async function connectToMongo() {
  if (db) {
    return db;
  }

  try {
    client = new MongoClient(MONGO_URI);
    await client.connect();
    db = client.db(DB_NAME);
    
    console.log('✅ MongoDB connected successfully');
    
    // Create indexes
    await createIndexes();
    
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

/**
 * Creates necessary indexes for collections
 */
async function createIndexes() {
  try {
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('todoLists').createIndex({ userId: 1 });
    await db.collection('todoItems').createIndex({ listId: 1 });
    await db.collection('todoItems').createIndex({ userId: 1 });
    await db.collection('todoItems').createIndex({ isCompleted: 1 });
  } catch (error) {
    console.error('Error creating indexes:', error);
  }
}

/**
 * Gets the database instance
 */
export function getDb() {
  if (!db) {
    throw new Error('Database not connected. Call connectToMongo() first.');
  }
  return db;
}

/**
 * Closes the MongoDB connection
 */
export async function closeMongo() {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log('MongoDB connection closed');
  }
}

// Handle process termination
process.on('SIGINT', async () => {
  await closeMongo();
  process.exit(0);
});

export default { connectToMongo, getDb, closeMongo };

