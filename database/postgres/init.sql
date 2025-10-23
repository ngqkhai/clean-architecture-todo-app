-- PostgreSQL Initialization Script
-- This runs BEFORE schema.sql to ensure the database and user exist

-- Note: This script runs as the postgres superuser
-- The database 'tododb' is already created via POSTGRES_DB env variable
-- The user 'todouser' is already created via POSTGRES_USER env variable
-- This file is just a backup/documentation

-- If you need to create them manually:
-- CREATE DATABASE tododb;
-- CREATE USER todouser WITH ENCRYPTED PASSWORD 'todopass';
-- GRANT ALL PRIVILEGES ON DATABASE tododb TO todouser;

-- Set the search path
SET search_path TO public;

-- This ensures the uuid extension is available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

