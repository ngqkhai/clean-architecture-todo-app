import { createServer } from './infrastructure/web/server.js';
import { config } from './config/config.js';

/**
 * Application Entry Point
 * 
 * Starts the Express server with Clean Architecture setup.
 */

async function start() {
  try {
    // Create and configure the server
    const app = await createServer();

    // Start listening
    const port = config.port;
    app.listen(port, () => {
      console.log('');
      console.log('='.repeat(60));
      console.log('✅ Clean Architecture To-Do Backend is RUNNING');
      console.log('='.repeat(60));
      console.log(`📡 Server:    http://localhost:${port}`);
      console.log(`💾 Database:  ${config.dbType.toUpperCase()}`);
      console.log(`🏥 Health:    http://localhost:${port}/health`);
      console.log(`📚 API Docs:  http://localhost:${port}/`);
      console.log('='.repeat(60));
      console.log('');
      console.log('🎯 KEY FEATURE: Database is swappable!');
      console.log(`   Current: ${config.dbType}`);
      console.log('   To switch: Change DB_TYPE in .env and restart');
      console.log('');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Start the application
start();

