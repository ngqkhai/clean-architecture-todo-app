/**
 * ITokenService Service Interface
 * Defines the contract for JWT token operations
 * This interface belongs to the Application Layer
 * Concrete implementation will be in the Infrastructure Layer (using jsonwebtoken)
 */

export interface TokenPayload {
  userId: string;
  email: string;
}

export interface ITokenService {
  /**
   * Generate a JWT token for a user
   * @param userId - The user's ID
   * @param email - The user's email
   * @returns The generated JWT token
   */
  generate(userId: string, email: string): string;

  /**
   * Verify and decode a JWT token
   * @param token - The JWT token to verify
   * @returns The decoded token payload if valid
   * @throws Error if the token is invalid or expired
   */
  verify(token: string): TokenPayload;
}

