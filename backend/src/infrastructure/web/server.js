import express from 'express';
import cors from 'cors';
import { config } from '../../config/config.js';
import { createRepositories } from '../factories/RepositoryFactory.js';

// Use Cases - Auth
import { RegisterUser } from '../../application/use-cases/auth/RegisterUser.js';
import { LoginUser } from '../../application/use-cases/auth/LoginUser.js';

// Use Cases - Lists
import { CreateToDoList } from '../../application/use-cases/lists/CreateToDoList.js';
import { GetAllLists } from '../../application/use-cases/lists/GetAllLists.js';
import { UpdateToDoList } from '../../application/use-cases/lists/UpdateToDoList.js';
import { DeleteToDoList } from '../../application/use-cases/lists/DeleteToDoList.js';

// Use Cases - Items
import { CreateToDoItem } from '../../application/use-cases/items/CreateToDoItem.js';
import { GetItemsForList } from '../../application/use-cases/items/GetItemsForList.js';
import { UpdateToDoItem } from '../../application/use-cases/items/UpdateToDoItem.js';
import { ToggleItemCompletion } from '../../application/use-cases/items/ToggleItemCompletion.js';
import { DeleteToDoItem } from '../../application/use-cases/items/DeleteToDoItem.js';

// Controllers
import { AuthController } from '../../adapters/controllers/AuthController.js';
import { ToDoListController } from '../../adapters/controllers/ToDoListController.js';
import { ToDoItemController } from '../../adapters/controllers/ToDoItemController.js';

// Routes
import { createAuthRoutes } from './routes/authRoutes.js';
import { createListRoutes } from './routes/listRoutes.js';
import { createItemRoutes } from './routes/itemRoutes.js';

/**
 * Server Setup - Clean Architecture Dependency Injection
 * 
 * This file demonstrates the complete dependency injection flow:
 * 1. Repositories are created by Factory (based on DB_TYPE)
 * 2. Use Cases are instantiated with repository dependencies
 * 3. Controllers are instantiated with use case dependencies
 * 4. Routes are created with controller dependencies
 * 5. Express app is configured and returned
 */

export async function createServer() {
  console.log('🚀 Starting Clean Architecture To-Do Backend...');
  console.log(`📊 Database Type: ${config.dbType}`);

  // 1. Create repositories (Factory pattern - THE KEY to database swapping)
  const { userRepository, listRepository, itemRepository } = await createRepositories();

  // 2. Instantiate Use Cases with repositories (Dependency Injection)
  // Auth Use Cases
  const registerUserUseCase = new RegisterUser(userRepository);
  const loginUserUseCase = new LoginUser(userRepository);

  // List Use Cases
  const createListUseCase = new CreateToDoList(listRepository);
  const getAllListsUseCase = new GetAllLists(listRepository);
  const updateListUseCase = new UpdateToDoList(listRepository);
  const deleteListUseCase = new DeleteToDoList(listRepository);

  // Item Use Cases
  const createItemUseCase = new CreateToDoItem(itemRepository, listRepository);
  const getItemsUseCase = new GetItemsForList(itemRepository, listRepository);
  const updateItemUseCase = new UpdateToDoItem(itemRepository);
  const toggleCompletionUseCase = new ToggleItemCompletion(itemRepository);
  const deleteItemUseCase = new DeleteToDoItem(itemRepository);

  // 3. Instantiate Controllers with use cases
  const authController = new AuthController(registerUserUseCase, loginUserUseCase);
  const listController = new ToDoListController(
    createListUseCase,
    getAllListsUseCase,
    updateListUseCase,
    deleteListUseCase
  );
  const itemController = new ToDoItemController(
    createItemUseCase,
    getItemsUseCase,
    updateItemUseCase,
    toggleCompletionUseCase,
    deleteItemUseCase
  );

  // 4. Create Express app
  const app = express();

  // 5. Middleware
  app.use(cors({ origin: config.cors.origin }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Request logging
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });

  // 6. Mount routes
  app.use('/api/auth', createAuthRoutes(authController));
  app.use('/api/lists', createListRoutes(listController));
  app.use('/api', createItemRoutes(itemController));

  // 7. Health check endpoint
  app.get('/health', (req, res) => {
    res.json({
      status: 'healthy',
      database: config.dbType,
      timestamp: new Date().toISOString()
    });
  });

  // 8. Root endpoint
  app.get('/', (req, res) => {
    res.json({
      message: 'Clean Architecture To-Do API',
      version: '1.0.0',
      database: config.dbType,
      endpoints: {
        health: '/health',
        auth: '/api/auth',
        lists: '/api/lists',
        items: '/api/items'
      }
    });
  });

  // 9. 404 handler
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: 'Endpoint not found'
    });
  });

  // 10. Global error handler
  app.use((err, req, res, next) => {
    console.error('Global error:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: config.nodeEnv === 'development' ? err.message : undefined
    });
  });

  return app;
}

