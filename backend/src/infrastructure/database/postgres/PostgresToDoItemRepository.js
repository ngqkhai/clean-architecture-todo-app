import pool from './connection.js';
import { IToDoItemRepository } from '../../../application/interfaces/IToDoItemRepository.js';

/**
 * PostgresToDoItemRepository - PostgreSQL implementation of IToDoItemRepository
 * 
 * Implements item CRUD operations using SQL queries.
 * Handles optional date fields properly.
 */
export class PostgresToDoItemRepository extends IToDoItemRepository {
  /**
   * Creates a new to-do item
   */
  async createItem(item) {
    const query = `
      INSERT INTO todo_items (title, description, is_completed, list_id, user_id, start_date, deadline_date, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id, title, description, is_completed, list_id, user_id, start_date, deadline_date, created_at, updated_at
    `;
    
    const values = [
      item.title,
      item.description || '',
      item.isCompleted || false,
      item.listId,
      item.userId,
      item.startDate || null,
      item.deadlineDate || null,
      item.createdAt || new Date(),
      item.updatedAt || new Date()
    ];

    const result = await pool.query(query, values);
    return this.mapRowToItem(result.rows[0]);
  }

  /**
   * Finds all items for a specific list
   */
  async findAllByListId(listId) {
    const query = 'SELECT * FROM todo_items WHERE list_id = $1 ORDER BY created_at ASC';
    const result = await pool.query(query, [listId]);
    
    return result.rows.map(row => this.mapRowToItem(row));
  }

  /**
   * Finds an item by ID
   */
  async findById(id) {
    const query = 'SELECT * FROM todo_items WHERE id = $1';
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRowToItem(result.rows[0]);
  }

  /**
   * Updates an item
   */
  async updateItem(id, updates) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    if (updates.title !== undefined) {
      fields.push(`title = $${paramCount++}`);
      values.push(updates.title);
    }
    if (updates.description !== undefined) {
      fields.push(`description = $${paramCount++}`);
      values.push(updates.description);
    }
    if (updates.isCompleted !== undefined) {
      fields.push(`is_completed = $${paramCount++}`);
      values.push(updates.isCompleted);
    }
    if (updates.startDate !== undefined) {
      fields.push(`start_date = $${paramCount++}`);
      values.push(updates.startDate);
    }
    if (updates.deadlineDate !== undefined) {
      fields.push(`deadline_date = $${paramCount++}`);
      values.push(updates.deadlineDate);
    }
    
    fields.push(`updated_at = $${paramCount++}`);
    values.push(updates.updatedAt || new Date());
    
    values.push(id);

    const query = `
      UPDATE todo_items 
      SET ${fields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING id, title, description, is_completed, list_id, user_id, start_date, deadline_date, created_at, updated_at
    `;

    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRowToItem(result.rows[0]);
  }

  /**
   * Deletes an item
   */
  async deleteItem(id) {
    const query = 'DELETE FROM todo_items WHERE id = $1 RETURNING id';
    const result = await pool.query(query, [id]);
    
    return result.rowCount > 0;
  }

  /**
   * Helper method to map database row to item object (snake_case to camelCase)
   */
  mapRowToItem(row) {
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      isCompleted: row.is_completed,
      listId: row.list_id,
      userId: row.user_id,
      startDate: row.start_date,
      deadlineDate: row.deadline_date,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
}

