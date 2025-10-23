import jwt from 'jsonwebtoken';
import { config } from '../../config/config.js';
import { success, error } from '../presenters/ResponseFormatter.js';

/**
 * AuthController - Handles authentication endpoints
 * 
 * Receives HTTP requests, delegates to Use Cases, returns HTTP responses.
 * This is part of the Adapters layer (Interface Adapters).
 */
export class AuthController {
  /**
   * @param {Object} registerUserUseCase - RegisterUser use case instance
   * @param {Object} loginUserUseCase - LoginUser use case instance
   */
  constructor(registerUserUseCase, loginUserUseCase) {
    this.registerUserUseCase = registerUserUseCase;
    this.loginUserUseCase = loginUserUseCase;
  }

  /**
   * POST /api/auth/register
   * Registers a new user
   */
  async register(req, res) {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json(error('Email and password are required', 400));
      }

      // Execute use case
      const user = await this.registerUserUseCase.execute(email, password);

      res.status(201).json(success(user, 'User registered successfully'));
    } catch (err) {
      if (err.name === 'DomainError') {
        return res.status(400).json(error(err.message, 400));
      }
      
      console.error('Registration error:', err);
      res.status(500).json(error('Registration failed', 500));
    }
  }

  /**
   * POST /api/auth/login
   * Authenticates a user and returns JWT
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json(error('Email and password are required', 400));
      }

      // Execute use case
      const user = await this.loginUserUseCase.execute(email, password);

      // Generate JWT
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      res.json(success({ user, token }, 'Login successful'));
    } catch (err) {
      if (err.name === 'DomainError') {
        return res.status(401).json(error(err.message, 401));
      }
      
      console.error('Login error:', err);
      res.status(500).json(error('Login failed', 500));
    }
  }
}

