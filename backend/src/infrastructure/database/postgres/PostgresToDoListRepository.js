import pool from './connection.js';
import { IToDoListRepository } from '../../../application/interfaces/IToDoListRepository.js';

/**
 * PostgresToDoListRepository - PostgreSQL implementation of IToDoListRepository
 * 
 * Implements list CRUD operations using SQL queries.
 * Cascade delete is handled by database constraints (ON DELETE CASCADE).
 */
export class PostgresToDoListRepository extends IToDoListRepository {
  /**
   * Creates a new to-do list
   */
  async createList(list) {
    const query = `
      INSERT INTO todo_lists (title, user_id, created_at, updated_at)
      VALUES ($1, $2, $3, $4)
      RETURNING id, title, user_id, created_at, updated_at
    `;
    
    const values = [
      list.title,
      list.userId,
      list.createdAt || new Date(),
      list.updatedAt || new Date()
    ];

    const result = await pool.query(query, values);
    const row = result.rows[0];
    
    return {
      id: row.id,
      title: row.title,
      userId: row.user_id,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  /**
   * Finds all lists for a specific user
   */
  async findAllByUserId(userId) {
    const query = 'SELECT * FROM todo_lists WHERE user_id = $1 ORDER BY created_at DESC';
    const result = await pool.query(query, [userId]);
    
    return result.rows.map(row => ({
      id: row.id,
      title: row.title,
      userId: row.user_id,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));
  }

  /**
   * Finds a list by ID
   */
  async findById(id) {
    const query = 'SELECT * FROM todo_lists WHERE id = $1';
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return {
      id: row.id,
      title: row.title,
      userId: row.user_id,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  /**
   * Updates a list
   */
  async updateList(id, updates) {
    const query = `
      UPDATE todo_lists 
      SET title = $1, updated_at = $2
      WHERE id = $3
      RETURNING id, title, user_id, created_at, updated_at
    `;
    
    const values = [updates.title, updates.updatedAt || new Date(), id];
    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return {
      id: row.id,
      title: row.title,
      userId: row.user_id,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  /**
   * Deletes a list (items are cascade deleted by database)
   */
  async deleteList(id) {
    const query = 'DELETE FROM todo_lists WHERE id = $1 RETURNING id';
    const result = await pool.query(query, [id]);
    
    return result.rowCount > 0;
  }
}

