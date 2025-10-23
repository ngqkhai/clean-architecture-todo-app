/**
 * Email Value Object
 * Encapsulates email validation logic
 * Ensures email format is always valid
 */

export class Email {
  private readonly value: string;

  private constructor(email: string) {
    this.value = email;
  }

  static create(email: string): Email {
    if (!email || email.trim().length === 0) {
      throw new Error('Email cannot be empty');
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      throw new Error('Invalid email format');
    }

    if (trimmedEmail.length > 255) {
      throw new Error('Email cannot exceed 255 characters');
    }

    return new Email(trimmedEmail);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}

