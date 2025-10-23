-- PostgreSQL Initialization Script
-- This runs BEFORE schema.sql to ensure the database and user exist

-- Note: This script runs as the postgres superuser
-- The database 'tododb' is created via POSTGRES_DB env variable
-- The user 'todouser' is created via POSTGRES_USER env variable
-- But we need to ensure proper permissions

-- Grant all privileges to todouser on the database
-- (The user and database are already created by PostgreSQL from env vars)

-- Connect to the tododb database
\c tododb;

-- Grant schema permissions
GRANT ALL ON SCHEMA public TO todouser;

-- Ensure the uuid extension is available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Grant default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO todouser;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO todouser;

