/**
 * Password Value Object
 * Encapsulates password validation logic
 * Ensures password meets minimum security requirements
 */

export class Password {
  private readonly value: string;
  private static readonly MIN_LENGTH = 8;
  private static readonly MAX_LENGTH = 128;

  private constructor(password: string) {
    this.value = password;
  }

  static create(password: string): Password {
    if (!password || password.length === 0) {
      throw new Error('Password cannot be empty');
    }

    if (password.length < Password.MIN_LENGTH) {
      throw new Error(`Password must be at least ${Password.MIN_LENGTH} characters long`);
    }

    if (password.length > Password.MAX_LENGTH) {
      throw new Error(`Password cannot exceed ${Password.MAX_LENGTH} characters`);
    }

    // Check for at least one letter and one number for better security
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!hasLetter || !hasNumber) {
      throw new Error('Password must contain at least one letter and one number');
    }

    return new Password(password);
  }

  getValue(): string {
    return this.value;
  }

  toString(): string {
    return '********'; // Never expose the actual password value
  }
}

