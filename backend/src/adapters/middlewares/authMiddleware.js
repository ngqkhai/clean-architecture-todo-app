import jwt from 'jsonwebtoken';
import { config } from '../../config/config.js';
import { error } from '../presenters/ResponseFormatter.js';

/**
 * Authentication Middleware
 * 
 * Verifies JWT token and attaches user data to request.
 * Protects routes that require authentication.
 */

export function authMiddleware(req, res, next) {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json(error('No token provided', 401));
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const decoded = jwt.verify(token, config.jwt.secret);

    // Attach user data to request
    req.user = {
      id: decoded.userId,
      email: decoded.email
    };

    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json(error('Token expired', 401));
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json(error('Invalid token', 401));
    }
    
    return res.status(401).json(error('Authentication failed', 401));
  }
}

