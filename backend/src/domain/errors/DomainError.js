/**
 * DomainError - Base error class for domain validation failures
 * 
 * This error class represents violations of business rules within the domain layer.
 * It ensures that domain logic remains pure and doesn't depend on external frameworks.
 * 
 * @extends Error
 */
export class DomainError extends Error {
  /**
   * Creates a new DomainError
   * @param {string} message - The error message describing the validation failure
   */
  constructor(message) {
    super(message);
    this.name = 'DomainError';
    
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DomainError);
    }
  }
}

