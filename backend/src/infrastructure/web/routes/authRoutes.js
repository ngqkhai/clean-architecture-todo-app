import express from 'express';

/**
 * Authentication Routes
 * 
 * Defines HTTP routes for authentication endpoints.
 */
export function createAuthRoutes(authController) {
  const router = express.Router();

  // POST /api/auth/register
  router.post('/register', (req, res) => authController.register(req, res));

  // POST /api/auth/login
  router.post('/login', (req, res) => authController.login(req, res));

  return router;
}

