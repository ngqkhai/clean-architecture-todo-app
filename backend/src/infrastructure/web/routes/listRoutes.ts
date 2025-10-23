/**
 * ToDoList Routes
 * All endpoints require authentication
 */

import { Router } from 'express';
import { ToDoListController } from '../controllers/ToDoListController';
import { authenticate } from '../middleware/authenticate';
import { validateRequest, CreateToDoListSchema, UpdateToDoListSchema } from '../middleware/validator';

const router = Router();
const controller = new ToDoListController();

// All routes require authentication
router.use(authenticate);

// Create a new list
router.post('/', validateRequest(CreateToDoListSchema), (req, res, next) => 
  controller.create(req, res, next)
);

// Get all lists for the authenticated user
router.get('/', (req, res, next) => 
  controller.getAll(req, res, next)
);

// Get a specific list by ID
router.get('/:id', (req, res, next) => 
  controller.getById(req, res, next)
);

// Update a list
router.put('/:id', validateRequest(UpdateToDoListSchema), (req, res, next) => 
  controller.update(req, res, next)
);

// Delete a list
router.delete('/:id', (req, res, next) => 
  controller.delete(req, res, next)
);

export { router as listRoutes };

