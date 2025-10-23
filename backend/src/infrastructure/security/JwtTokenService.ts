/**
 * JwtTokenService
 * Concrete implementation of ITokenService using jsonwebtoken
 * This belongs to the Infrastructure Layer
 */

import jwt from 'jsonwebtoken';
import { ITokenService, TokenPayload } from '@application/services/ITokenService';

export class JwtTokenService implements ITokenService {
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor(secret: string, expiresIn: string = '24h') {
    if (!secret || secret.length === 0) {
      throw new Error('JWT secret is required');
    }
    this.secret = secret;
    this.expiresIn = expiresIn;
  }

  generate(userId: string, email: string): string {
    const payload: TokenPayload = {
      userId,
      email,
    };

    return jwt.sign(payload, this.secret, {
      expiresIn: this.expiresIn as string | number,
    });
  }

  verify(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(token, this.secret) as TokenPayload;
      return decoded;
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid token');
      }
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Token has expired');
      }
      throw new Error('Token verification failed');
    }
  }
}

