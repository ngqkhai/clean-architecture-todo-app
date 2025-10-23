/**
 * Express Application Setup
 * Configures Express with middleware, routes, and error handling
 */

import express, { Application } from 'express';
import cors from 'cors';
import { errorHandler } from '../middleware/errorHandler';
import { authRoutes } from '../routes/authRoutes';
import { listRoutes } from '../routes/listRoutes';
import { itemRoutes } from '../routes/itemRoutes';

export function createApp(): Application {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/lists', listRoutes);
  app.use('/api/items', itemRoutes);

  // Global error handler (must be last)
  app.use(errorHandler);

  return app;
}

