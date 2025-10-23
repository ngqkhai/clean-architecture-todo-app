/**
 * MongoDB Connection
 * Manages database connections using Mongoose
 */

import mongoose from 'mongoose';

let isConnected = false;

export async function connectMongoDB(): Promise<typeof mongoose> {
  if (isConnected) {
    return mongoose;
  }

  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/todo_db';

  try {
    await mongoose.connect(mongoUri);
    isConnected = true;
    console.log('MongoDB connected successfully');
    return mongoose;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export async function disconnectMongoDB(): Promise<void> {
  if (!isConnected) {
    return;
  }

  await mongoose.disconnect();
  isConnected = false;
  console.log('MongoDB disconnected');
}

export function getMongoConnection(): typeof mongoose {
  if (!isConnected) {
    throw new Error('MongoDB is not connected. Call connectMongoDB() first.');
  }
  return mongoose;
}

