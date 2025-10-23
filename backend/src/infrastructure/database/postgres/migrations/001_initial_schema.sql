-- Initial Database Schema for Clean Architecture To-Do Application
-- PostgreSQL Migration Script

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ToDoLists table
CREATE TABLE IF NOT EXISTS todo_lists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_todo_lists_user_id ON todo_lists(user_id);

-- ToDoItems table
CREATE TABLE IF NOT EXISTS todo_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    list_id UUID NOT NULL REFERENCES todo_lists(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    start_date TIMESTAMP,
    deadline_date TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT valid_date_range CHECK (
        deadline_date IS NULL 
        OR start_date IS NULL 
        OR deadline_date >= start_date
    )
);

-- Indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_todo_items_list_id ON todo_items(list_id);
CREATE INDEX IF NOT EXISTS idx_todo_items_deadline ON todo_items(deadline_date);
CREATE INDEX IF NOT EXISTS idx_todo_items_is_completed ON todo_items(is_completed);

