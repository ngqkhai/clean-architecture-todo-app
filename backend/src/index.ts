/**
 * Application Entry Point
 * Starts the Express server and connects to the database
 */

import dotenv from 'dotenv';
import { createApp } from './infrastructure/web/express/app';
import { createPostgresPool, closePostgresPool } from './infrastructure/database/postgres/connection';
import { connectMongoDB, disconnectMongoDB } from './infrastructure/database/mongodb/connection';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_TYPE = process.env.DB_TYPE || 'postgres';

async function startServer() {
  try {
    // Connect to database based on DB_TYPE
    console.log(`Starting application with database type: ${DB_TYPE}`);
    
    if (DB_TYPE === 'postgres') {
      createPostgresPool();
      console.log('PostgreSQL connection pool created');
    } else if (DB_TYPE === 'mongo') {
      await connectMongoDB();
      console.log('MongoDB connected');
    } else {
      throw new Error(`Unsupported database type: ${DB_TYPE}`);
    }

    // Create Express app
    const app = createApp();

    // Start server
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📊 Database: ${DB_TYPE}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`\n✨ Clean Architecture To-Do Application`);
      console.log(`Health check: http://localhost:${PORT}/health`);
    });

    // Graceful shutdown
    const shutdown = async () => {
      console.log('\n🛑 Shutting down gracefully...');
      
      server.close(async () => {
        console.log('✅ HTTP server closed');
        
        // Close database connections
        if (DB_TYPE === 'postgres') {
          await closePostgresPool();
          console.log('✅ PostgreSQL connection closed');
        } else if (DB_TYPE === 'mongo') {
          await disconnectMongoDB();
          console.log('✅ MongoDB connection closed');
        }
        
        console.log('👋 Server shut down successfully');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();

