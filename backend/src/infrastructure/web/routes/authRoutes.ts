/**
 * Authentication Routes
 * Public and protected auth endpoints
 */

import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { authenticate } from '../middleware/authenticate';
import { validateRequest, RegisterUserSchema, LoginUserSchema } from '../middleware/validator';

const router = Router();
const controller = new AuthController();

// Public routes
router.post('/register', validateRequest(RegisterUserSchema), (req, res, next) => 
  controller.register(req, res, next)
);

router.post('/login', validateRequest(LoginUserSchema), (req, res, next) => 
  controller.login(req, res, next)
);

// Protected routes
router.get('/me', authenticate, (req, res, next) => 
  controller.getCurrentUser(req, res, next)
);

export { router as authRoutes };

