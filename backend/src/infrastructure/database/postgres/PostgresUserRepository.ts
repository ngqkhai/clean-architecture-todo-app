/**
 * PostgresUserRepository
 * PostgreSQL implementation of IUserRepository
 * Uses pg library for database operations
 */

import { User } from '@domain/entities/User';
import { IUserRepository } from '@application/repositories/IUserRepository';
import { getPostgresPool } from './connection';

export class PostgresUserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    const pool = getPostgresPool();
    const query = `
      INSERT INTO users (id, email, password_hash, name, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    
    const values = [
      user.id,
      user.email,
      user.passwordHash,
      user.name,
      user.createdAt,
      user.updatedAt,
    ];

    const result = await pool.query(query, values);
    return this.mapToEntity(result.rows[0]);
  }

  async findByEmail(email: string): Promise<User | null> {
    const pool = getPostgresPool();
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapToEntity(result.rows[0]);
  }

  async findById(id: string): Promise<User | null> {
    const pool = getPostgresPool();
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapToEntity(result.rows[0]);
  }

  async update(user: User): Promise<User> {
    const pool = getPostgresPool();
    const query = `
      UPDATE users
      SET email = $1, password_hash = $2, name = $3, updated_at = $4
      WHERE id = $5
      RETURNING *
    `;

    const values = [
      user.email,
      user.passwordHash,
      user.name,
      user.updatedAt,
      user.id,
    ];

    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      throw new Error('User not found');
    }

    return this.mapToEntity(result.rows[0]);
  }

  async delete(id: string): Promise<boolean> {
    const pool = getPostgresPool();
    const query = 'DELETE FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }

  private mapToEntity(row: any): User {
    return User.reconstitute({
      id: row.id,
      email: row.email,
      passwordHash: row.password_hash,
      name: row.name,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  }
}

