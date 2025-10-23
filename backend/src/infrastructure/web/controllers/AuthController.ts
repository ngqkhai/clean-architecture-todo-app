/**
 * AuthController
 * Handles HTTP requests for authentication
 * Uses use cases and repository factory
 */

import { Request, Response, NextFunction } from 'express';
import { RegisterUser } from '@application/use-cases/auth/RegisterUser';
import { LoginUser } from '@application/use-cases/auth/LoginUser';
import { GetCurrentUser } from '@application/use-cases/auth/GetCurrentUser';
import { RepositoryFactory } from '@infrastructure/database/factory/RepositoryFactory';
import { BcryptPasswordHasher } from '@infrastructure/security/BcryptPasswordHasher';
import { JwtTokenService } from '@infrastructure/security/JwtTokenService';
import { AuthenticatedRequest } from '../middleware/authenticate';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password, name } = req.body;

      const userRepository = RepositoryFactory.createUserRepository();
      const passwordHasher = new BcryptPasswordHasher(
        parseInt(process.env.BCRYPT_SALT_ROUNDS || '10')
      );

      const useCase = new RegisterUser(userRepository, passwordHasher);
      const result = await useCase.execute({ email, password, name });

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      const userRepository = RepositoryFactory.createUserRepository();
      const passwordHasher = new BcryptPasswordHasher();
      const jwtSecret = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';
      const tokenService = new JwtTokenService(jwtSecret, process.env.JWT_EXPIRATION);

      const useCase = new LoginUser(userRepository, passwordHasher, tokenService);
      const result = await useCase.execute({ email, password });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getCurrentUser(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.userId) {
        throw new Error('User ID not found in request');
      }

      const userRepository = RepositoryFactory.createUserRepository();
      const useCase = new GetCurrentUser(userRepository);
      const result = await useCase.execute({ userId: req.userId });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

