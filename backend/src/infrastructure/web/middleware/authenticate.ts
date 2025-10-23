/**
 * Authentication Middleware
 * Verifies JWT token and attaches userId to request
 */

import { Request, Response, NextFunction } from 'express';
import { JwtTokenService } from '@infrastructure/security/JwtTokenService';

// Extend Express Request to include userId
export interface AuthenticatedRequest extends Request {
  userId?: string;
  userEmail?: string;
}

export function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        error: 'No token provided',
        code: 'UNAUTHORIZED',
      });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const jwtSecret = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';
    const tokenService = new JwtTokenService(jwtSecret);
    
    const payload = tokenService.verify(token);

    // Attach user info to request
    req.userId = payload.userId;
    req.userEmail = payload.email;

    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({
        error: error.message,
        code: 'UNAUTHORIZED',
      });
    } else {
      res.status(401).json({
        error: 'Authentication failed',
        code: 'UNAUTHORIZED',
      });
    }
  }
}

