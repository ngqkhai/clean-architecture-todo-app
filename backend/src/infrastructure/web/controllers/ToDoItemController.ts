/**
 * ToDoItemController
 * Handles HTTP requests for to-do items
 * All endpoints are protected and require authentication
 */

import { Response, NextFunction } from 'express';
import { CreateToDoItem } from '@application/use-cases/todo-item/CreateToDoItem';
import { GetItemsByList } from '@application/use-cases/todo-item/GetItemsByList';
import { UpdateToDoItem } from '@application/use-cases/todo-item/UpdateToDoItem';
import { ToggleItemCompletion } from '@application/use-cases/todo-item/ToggleItemCompletion';
import { DeleteToDoItem } from '@application/use-cases/todo-item/DeleteToDoItem';
import { RepositoryFactory } from '@infrastructure/database/factory/RepositoryFactory';
import { AuthenticatedRequest } from '../middleware/authenticate';

export class ToDoItemController {
  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.userId) {
        throw new Error('User ID not found in request');
      }

      const { listId } = req.params;
      if (!listId) {
        throw new Error('List ID is required');
      }

      const { title, description, startDate, deadlineDate } = req.body;

      const itemRepository = RepositoryFactory.createToDoItemRepository();
      const listRepository = RepositoryFactory.createToDoListRepository();
      const useCase = new CreateToDoItem(itemRepository, listRepository);
      
      const result = await useCase.execute({
        listId,
        userId: req.userId,
        title,
        description,
        startDate: startDate ? new Date(startDate) : null,
        deadlineDate: deadlineDate ? new Date(deadlineDate) : null,
      });

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getByListId(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.userId) {
        throw new Error('User ID not found in request');
      }

      const { listId } = req.params;
      if (!listId) {
        throw new Error('List ID is required');
      }
      
      const itemRepository = RepositoryFactory.createToDoItemRepository();
      const listRepository = RepositoryFactory.createToDoListRepository();
      const useCase = new GetItemsByList(itemRepository, listRepository);
      
      const result = await useCase.execute({
        listId,
        userId: req.userId,
      });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.userId) {
        throw new Error('User ID not found in request');
      }

      const { id } = req.params;
      if (!id) {
        throw new Error('Item ID is required');
      }

      const { title, description, startDate, deadlineDate } = req.body;

      const itemRepository = RepositoryFactory.createToDoItemRepository();
      const listRepository = RepositoryFactory.createToDoListRepository();
      const useCase = new UpdateToDoItem(itemRepository, listRepository);
      
      const result = await useCase.execute({
        itemId: id,
        userId: req.userId,
        title,
        description,
        startDate: startDate ? new Date(startDate) : undefined,
        deadlineDate: deadlineDate ? new Date(deadlineDate) : undefined,
      });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async toggleComplete(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.userId) {
        throw new Error('User ID not found in request');
      }

      const { id } = req.params;
      if (!id) {
        throw new Error('Item ID is required');
      }

      const itemRepository = RepositoryFactory.createToDoItemRepository();
      const listRepository = RepositoryFactory.createToDoListRepository();
      const useCase = new ToggleItemCompletion(itemRepository, listRepository);
      
      const result = await useCase.execute({
        itemId: id,
        userId: req.userId,
      });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.userId) {
        throw new Error('User ID not found in request');
      }

      const { id } = req.params;
      if (!id) {
        throw new Error('Item ID is required');
      }

      const itemRepository = RepositoryFactory.createToDoItemRepository();
      const listRepository = RepositoryFactory.createToDoListRepository();
      const useCase = new DeleteToDoItem(itemRepository, listRepository);
      
      await useCase.execute({
        itemId: id,
        userId: req.userId,
      });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

