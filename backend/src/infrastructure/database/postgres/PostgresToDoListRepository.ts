/**
 * PostgresToDoListRepository
 * PostgreSQL implementation of IToDoListRepository
 * Includes CASCADE delete support
 */

import { ToDoList } from '@domain/entities/ToDoList';
import { IToDoListRepository } from '@application/repositories/IToDoListRepository';
import { getPostgresPool } from './connection';

export class PostgresToDoListRepository implements IToDoListRepository {
  async create(list: ToDoList): Promise<ToDoList> {
    const pool = getPostgresPool();
    const query = `
      INSERT INTO todo_lists (id, user_id, title, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const values = [
      list.id,
      list.userId,
      list.title,
      list.createdAt,
      list.updatedAt,
    ];

    const result = await pool.query(query, values);
    return this.mapToEntity(result.rows[0]);
  }

  async findAllByUserId(userId: string): Promise<ToDoList[]> {
    const pool = getPostgresPool();
    const query = `
      SELECT * FROM todo_lists
      WHERE user_id = $1
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query, [userId]);
    return result.rows.map(row => this.mapToEntity(row));
  }

  async findById(id: string): Promise<ToDoList | null> {
    const pool = getPostgresPool();
    const query = 'SELECT * FROM todo_lists WHERE id = $1';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapToEntity(result.rows[0]);
  }

  async update(list: ToDoList): Promise<ToDoList> {
    const pool = getPostgresPool();
    const query = `
      UPDATE todo_lists
      SET title = $1, updated_at = $2
      WHERE id = $3
      RETURNING *
    `;

    const values = [list.title, list.updatedAt, list.id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      throw new Error('ToDoList not found');
    }

    return this.mapToEntity(result.rows[0]);
  }

  async delete(id: string): Promise<boolean> {
    const pool = getPostgresPool();
    // CASCADE delete is handled by the database foreign key constraint
    const query = 'DELETE FROM todo_lists WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }

  private mapToEntity(row: any): ToDoList {
    return ToDoList.reconstitute({
      id: row.id,
      userId: row.user_id,
      title: row.title,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  }
}

