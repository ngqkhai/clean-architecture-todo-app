/**
 * ToDoItem Routes
 * All endpoints require authentication
 */

import { Router } from 'express';
import { ToDoItemController } from '../controllers/ToDoItemController';
import { authenticate } from '../middleware/authenticate';
import { validateRequest, CreateToDoItemSchema, UpdateToDoItemSchema } from '../middleware/validator';

const router = Router();
const controller = new ToDoItemController();

// All routes require authentication
router.use(authenticate);

// Create a new item in a list
router.post('/lists/:listId/items', validateRequest(CreateToDoItemSchema), (req, res, next) => 
  controller.create(req, res, next)
);

// Get all items in a list
router.get('/lists/:listId/items', (req, res, next) => 
  controller.getByListId(req, res, next)
);

// Update an item
router.put('/:id', validateRequest(UpdateToDoItemSchema), (req, res, next) => 
  controller.update(req, res, next)
);

// Toggle item completion status
router.patch('/:id/complete', (req, res, next) => 
  controller.toggleComplete(req, res, next)
);

// Delete an item
router.delete('/:id', (req, res, next) => 
  controller.delete(req, res, next)
);

export { router as itemRoutes };

