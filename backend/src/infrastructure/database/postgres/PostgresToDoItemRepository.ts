/**
 * PostgresToDoItemRepository
 * PostgreSQL implementation of IToDoItemRepository
 * Includes date constraint checks via database constraints
 */

import { ToDoItem } from '@domain/entities/ToDoItem';
import { IToDoItemRepository } from '@application/repositories/IToDoItemRepository';
import { getPostgresPool } from './connection';

export class PostgresToDoItemRepository implements IToDoItemRepository {
  async create(item: ToDoItem): Promise<ToDoItem> {
    const pool = getPostgresPool();
    const query = `
      INSERT INTO todo_items (
        id, list_id, title, description, is_completed,
        start_date, deadline_date, created_at, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;

    const values = [
      item.id,
      item.listId,
      item.title,
      item.description,
      item.isCompleted,
      item.startDate,
      item.deadlineDate,
      item.createdAt,
      item.updatedAt,
    ];

    const result = await pool.query(query, values);
    return this.mapToEntity(result.rows[0]);
  }

  async findByListId(listId: string): Promise<ToDoItem[]> {
    const pool = getPostgresPool();
    const query = `
      SELECT * FROM todo_items
      WHERE list_id = $1
      ORDER BY created_at ASC
    `;
    const result = await pool.query(query, [listId]);
    return result.rows.map((row: any) => this.mapToEntity(row));
  }

  async findById(id: string): Promise<ToDoItem | null> {
    const pool = getPostgresPool();
    const query = 'SELECT * FROM todo_items WHERE id = $1';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapToEntity(result.rows[0]);
  }

  async update(item: ToDoItem): Promise<ToDoItem> {
    const pool = getPostgresPool();
    const query = `
      UPDATE todo_items
      SET title = $1, description = $2, is_completed = $3,
          start_date = $4, deadline_date = $5, updated_at = $6
      WHERE id = $7
      RETURNING *
    `;

    const values = [
      item.title,
      item.description,
      item.isCompleted,
      item.startDate,
      item.deadlineDate,
      item.updatedAt,
      item.id,
    ];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      throw new Error('ToDoItem not found');
    }

    return this.mapToEntity(result.rows[0]);
  }

  async delete(id: string): Promise<boolean> {
    const pool = getPostgresPool();
    const query = 'DELETE FROM todo_items WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }

  private mapToEntity(row: any): ToDoItem {
    return ToDoItem.reconstitute({
      id: row.id,
      listId: row.list_id,
      title: row.title,
      description: row.description,
      isCompleted: row.is_completed,
      startDate: row.start_date,
      deadlineDate: row.deadline_date,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  }
}

