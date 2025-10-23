/**
 * Validator Middleware
 * Uses Zod for request validation
 */

import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';

export function validateRequest(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          error: 'Validation failed',
          code: 'VALIDATION_ERROR',
          details: error.issues.map((err) => ({
            path: err.path.join('.'),
            message: err.message,
          })),
        });
      } else {
        res.status(400).json({
          error: 'Invalid request data',
          code: 'BAD_REQUEST',
        });
      }
    }
  };
}

// Common validation schemas
export const RegisterUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1, 'Name is required').max(100, 'Name cannot exceed 100 characters'),
});

export const LoginUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export const CreateToDoListSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title cannot exceed 100 characters'),
});

export const UpdateToDoListSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title cannot exceed 100 characters'),
});

export const CreateToDoItemSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title cannot exceed 200 characters'),
  description: z.string().max(1000, 'Description cannot exceed 1000 characters').optional().nullable(),
  startDate: z.string().datetime().optional().nullable(),
  deadlineDate: z.string().datetime().optional().nullable(),
});

export const UpdateToDoItemSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title cannot exceed 200 characters').optional(),
  description: z.string().max(1000, 'Description cannot exceed 1000 characters').optional().nullable(),
  startDate: z.string().datetime().optional().nullable(),
  deadlineDate: z.string().datetime().optional().nullable(),
});

