-- PostgreSQL Schema for Clean Architecture To-Do Application
-- This schema defines the relational database structure for users, lists, and items

-- Enable UUID extension for generating unique identifiers
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLE: users
-- Stores user account information
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster email lookups (used in login)
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ============================================================
-- TABLE: todo_lists
-- Stores to-do lists belonging to users
-- ============================================================
CREATE TABLE IF NOT EXISTS todo_lists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(100) NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT title_not_empty CHECK (LENGTH(TRIM(title)) > 0)
);

-- Index for faster user-based list queries
CREATE INDEX IF NOT EXISTS idx_todo_lists_user_id ON todo_lists(user_id);

-- ============================================================
-- TABLE: todo_items
-- Stores individual to-do items within lists
-- ============================================================
CREATE TABLE IF NOT EXISTS todo_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT FALSE,
    list_id UUID NOT NULL REFERENCES todo_lists(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    start_date TIMESTAMP,
    deadline_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT title_not_empty CHECK (LENGTH(TRIM(title)) > 0),
    -- CRITICAL BUSINESS RULE: Deadline cannot be before start date
    CONSTRAINT valid_dates CHECK (
        deadline_date IS NULL OR 
        start_date IS NULL OR 
        deadline_date >= start_date
    )
);

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_todo_items_list_id ON todo_items(list_id);
CREATE INDEX IF NOT EXISTS idx_todo_items_user_id ON todo_items(user_id);
CREATE INDEX IF NOT EXISTS idx_todo_items_completed ON todo_items(is_completed);

-- ============================================================
-- COMMENTS (for documentation)
-- ============================================================
COMMENT ON TABLE users IS 'Stores user authentication and profile information';
COMMENT ON TABLE todo_lists IS 'Stores to-do lists with CASCADE DELETE to remove all items when list is deleted';
COMMENT ON TABLE todo_items IS 'Stores individual tasks with date validation constraint';
COMMENT ON CONSTRAINT valid_dates ON todo_items IS 'Enforces business rule: deadline_date must not be before start_date';

