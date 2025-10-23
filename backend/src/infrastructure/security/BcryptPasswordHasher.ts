/**
 * BcryptPasswordHasher
 * Concrete implementation of IPasswordHasher using bcrypt
 * This belongs to the Infrastructure Layer
 */

import * as bcrypt from 'bcrypt';
import { IPasswordHasher } from '@application/services/IPasswordHasher';

export class BcryptPasswordHasher implements IPasswordHasher {
  private readonly saltRounds: number;

  constructor(saltRounds: number = 10) {
    this.saltRounds = saltRounds;
  }

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}

