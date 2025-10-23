import dotenv from 'dotenv';

dotenv.config();

/**
 * Application Configuration
 * 
 * Centralizes all environment variables and configuration.
 * Provides defaults for development.
 */

export const config = {
  // Server
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000'),

  // Database Selection (CRITICAL for Clean Architecture demo)
  dbType: process.env.DB_TYPE || 'postgres',

  // PostgreSQL
  postgres: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    database: process.env.POSTGRES_DB || 'tododb',
    user: process.env.POSTGRES_USER || 'todouser',
    password: process.env.POSTGRES_PASSWORD || 'todopass'
  },

  // MongoDB
  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://todouser:todopass@localhost:27017/tododb?authSource=admin',
    dbName: process.env.MONGO_DB_NAME || 'tododb'
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production-min-32-chars',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  },

  // CORS
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
  }
};

export default config;

