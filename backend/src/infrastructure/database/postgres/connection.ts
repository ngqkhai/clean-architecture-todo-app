/**
 * PostgreSQL Connection Pool
 * Manages database connections using the pg library
 */

import { Pool } from 'pg';

let pool: Pool | null = null;

export function createPostgresPool(): Pool {
  if (pool) {
    return pool;
  }

  pool = new Pool({
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    database: process.env.POSTGRES_DB || 'todo_db',
    user: process.env.POSTGRES_USER || 'todo_user',
    password: process.env.POSTGRES_PASSWORD || 'todo_password',
    max: 20, // maximum number of clients in the pool
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

  return pool;
}

export function getPostgresPool(): Pool {
  if (!pool) {
    return createPostgresPool();
  }
  return pool;
}

export async function closePostgresPool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

