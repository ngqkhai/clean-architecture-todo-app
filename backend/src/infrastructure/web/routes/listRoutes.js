import express from 'express';
import { authMiddleware } from '../../../adapters/middlewares/authMiddleware.js';

/**
 * To-Do List Routes
 * 
 * All routes are protected with authMiddleware.
 */
export function createListRoutes(listController) {
  const router = express.Router();

  // All list routes require authentication
  router.use(authMiddleware);

  // GET /api/lists - Get all lists for authenticated user
  router.get('/', (req, res) => listController.getAllLists(req, res));

  // POST /api/lists - Create new list
  router.post('/', (req, res) => listController.createList(req, res));

  // PUT /api/lists/:id - Update list
  router.put('/:id', (req, res) => listController.updateList(req, res));

  // DELETE /api/lists/:id - Delete list
  router.delete('/:id', (req, res) => listController.deleteList(req, res));

  return router;
}

