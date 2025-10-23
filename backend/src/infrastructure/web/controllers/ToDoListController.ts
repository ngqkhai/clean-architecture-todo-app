/**
 * ToDoListController
 * Handles HTTP requests for to-do lists
 * All endpoints are protected and require authentication
 */

import { Response, NextFunction } from 'express';
import { CreateToDoList } from '@application/use-cases/todo-list/CreateToDoList';
import { GetAllToDoListsByUser } from '@application/use-cases/todo-list/GetAllToDoListsByUser';
import { GetToDoListById } from '@application/use-cases/todo-list/GetToDoListById';
import { UpdateToDoList } from '@application/use-cases/todo-list/UpdateToDoList';
import { DeleteToDoList } from '@application/use-cases/todo-list/DeleteToDoList';
import { RepositoryFactory } from '@infrastructure/database/factory/RepositoryFactory';
import { AuthenticatedRequest } from '../middleware/authenticate';

export class ToDoListController {
  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.userId) {
        throw new Error('User ID not found in request');
      }

      const { title } = req.body;
      const listRepository = RepositoryFactory.createToDoListRepository();
      const useCase = new CreateToDoList(listRepository);
      
      const result = await useCase.execute({
        userId: req.userId,
        title,
      });

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.userId) {
        throw new Error('User ID not found in request');
      }

      const listRepository = RepositoryFactory.createToDoListRepository();
      const useCase = new GetAllToDoListsByUser(listRepository);
      
      const result = await useCase.execute({ userId: req.userId });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.userId) {
        throw new Error('User ID not found in request');
      }

      const { id } = req.params;
      if (!id) {
        throw new Error('List ID is required');
      }

      const listRepository = RepositoryFactory.createToDoListRepository();
      const useCase = new GetToDoListById(listRepository);
      
      const result = await useCase.execute({
        listId: id,
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
        throw new Error('List ID is required');
      }

      const { title } = req.body;
      const listRepository = RepositoryFactory.createToDoListRepository();
      const useCase = new UpdateToDoList(listRepository);
      
      const result = await useCase.execute({
        listId: id,
        userId: req.userId,
        title,
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
        throw new Error('List ID is required');
      }

      const listRepository = RepositoryFactory.createToDoListRepository();
      const useCase = new DeleteToDoList(listRepository);
      
      await useCase.execute({
        listId: id,
        userId: req.userId,
      });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

