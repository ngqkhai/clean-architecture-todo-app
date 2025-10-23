/**
 * IPasswordHasher Service Interface
 * Defines the contract for password hashing operations
 * This interface belongs to the Application Layer
 * Concrete implementation will be in the Infrastructure Layer (using bcrypt)
 */

export interface IPasswordHasher {
  /**
   * Hash a plain-text password
   * @param password - The plain-text password to hash
   * @returns The hashed password
   */
  hash(password: string): Promise<string>;

  /**
   * Compare a plain-text password with a hashed password
   * @param password - The plain-text password to verify
   * @param hashedPassword - The hashed password to compare against
   * @returns True if the password matches, false otherwise
   */
  compare(password: string, hashedPassword: string): Promise<boolean>;
}

