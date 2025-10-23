import pool from './connection.js';
import { IUserRepository } from '../../../application/interfaces/IUserRepository.js';

/**
 * PostgresUserRepository - PostgreSQL implementation of IUserRepository
 * 
 * This adapter implements the repository interface using SQL queries.
 * It's part of the Infrastructure layer and can be swapped with MongoUserRepository.
 */
export class PostgresUserRepository extends IUserRepository {
  /**
   * Creates a new user in PostgreSQL
   */
  async createUser(user) {
    const query = `
      INSERT INTO users (email, password_hash, created_at, updated_at)
      VALUES ($1, $2, $3, $4)
      RETURNING id, email, created_at, updated_at
    `;
    
    const values = [
      user.email,
      user.passwordHash,
      user.createdAt || new Date(),
      user.updatedAt || new Date()
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  /**
   * Finds a user by email
   */
  async findUserByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    
    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return {
      id: row.id,
      email: row.email,
      passwordHash: row.password_hash,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  /**
   * Finds a user by ID
   */
  async findUserById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return {
      id: row.id,
      email: row.email,
      passwordHash: row.password_hash,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
}

