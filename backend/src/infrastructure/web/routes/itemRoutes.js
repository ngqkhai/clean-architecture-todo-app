import express from 'express';
import { authMiddleware } from '../../../adapters/middlewares/authMiddleware.js';

/**
 * To-Do Item Routes
 * 
 * All routes are protected with authMiddleware.
 */
export function createItemRoutes(itemController) {
  const router = express.Router();

  // All item routes require authentication
  router.use(authMiddleware);

  // GET /api/lists/:listId/items - Get all items in a list
  router.get('/lists/:listId/items', (req, res) => itemController.getItemsForList(req, res));

  // POST /api/lists/:listId/items - Create new item in a list
  router.post('/lists/:listId/items', (req, res) => itemController.createItem(req, res));

  // PUT /api/items/:id - Update item
  router.put('/items/:id', (req, res) => itemController.updateItem(req, res));

  // PATCH /api/items/:id/toggle - Toggle item completion
  router.patch('/items/:id/toggle', (req, res) => itemController.toggleCompletion(req, res));

  // DELETE /api/items/:id - Delete item
  router.delete('/items/:id', (req, res) => itemController.deleteItem(req, res));

  return router;
}

