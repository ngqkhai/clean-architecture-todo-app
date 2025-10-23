# Task List: Clean Architecture To-Do List Application

**Generated from:** `prd-todo-clean-architecture.md` (v2.0 - with Authentication)  
**Date:** October 23, 2025  
**Target Implementation:** Node.js/TypeScript Backend + React/TypeScript Frontend

---

## Relevant Files

### Backend Files

**Domain Layer:**
- `backend/src/domain/entities/User.ts` - User entity with id, email, name, password hash
- `backend/src/domain/entities/ToDoList.ts` - ToDoList entity with userId reference
- `backend/src/domain/entities/ToDoItem.ts` - ToDoItem entity with date validation
- `backend/src/domain/value-objects/Email.ts` - Email validation value object
- `backend/src/domain/value-objects/Password.ts` - Password validation value object
- `backend/src/domain/value-objects/DateRange.ts` - Date range validation (start/deadline)

**Application Layer:**
- `backend/src/application/repositories/IUserRepository.ts` - User repository interface
- `backend/src/application/repositories/IToDoListRepository.ts` - ToDoList repository interface
- `backend/src/application/repositories/IToDoItemRepository.ts` - ToDoItem repository interface
- `backend/src/application/services/IPasswordHasher.ts` - Password hashing service interface
- `backend/src/application/services/ITokenService.ts` - JWT token service interface
- `backend/src/application/use-cases/auth/RegisterUser.ts` - User registration use case
- `backend/src/application/use-cases/auth/LoginUser.ts` - User login use case
- `backend/src/application/use-cases/auth/GetCurrentUser.ts` - Get current user use case
- `backend/src/application/use-cases/todo-list/CreateToDoList.ts` - Create list use case
- `backend/src/application/use-cases/todo-list/GetAllToDoListsByUser.ts` - Get user's lists
- `backend/src/application/use-cases/todo-list/GetToDoListById.ts` - Get specific list
- `backend/src/application/use-cases/todo-list/UpdateToDoList.ts` - Update list use case
- `backend/src/application/use-cases/todo-list/DeleteToDoList.ts` - Delete list use case
- `backend/src/application/use-cases/todo-item/CreateToDoItem.ts` - Create item use case
- `backend/src/application/use-cases/todo-item/GetItemsByList.ts` - Get list's items
- `backend/src/application/use-cases/todo-item/UpdateToDoItem.ts` - Update item use case
- `backend/src/application/use-cases/todo-item/ToggleItemCompletion.ts` - Toggle completion
- `backend/src/application/use-cases/todo-item/DeleteToDoItem.ts` - Delete item use case

**Infrastructure Layer - Security:**
- `backend/src/infrastructure/security/BcryptPasswordHasher.ts` - Bcrypt implementation
- `backend/src/infrastructure/security/JwtTokenService.ts` - JWT implementation

**Infrastructure Layer - Database:**
- `backend/src/infrastructure/database/postgres/PostgresUserRepository.ts` - Postgres user repo
- `backend/src/infrastructure/database/postgres/PostgresToDoListRepository.ts` - Postgres list repo
- `backend/src/infrastructure/database/postgres/PostgresToDoItemRepository.ts` - Postgres item repo
- `backend/src/infrastructure/database/postgres/connection.ts` - Postgres connection pool
- `backend/src/infrastructure/database/postgres/migrations/001_initial_schema.sql` - Database schema
- `backend/src/infrastructure/database/mongodb/MongoUserRepository.ts` - Mongo user repo
- `backend/src/infrastructure/database/mongodb/MongoToDoListRepository.ts` - Mongo list repo
- `backend/src/infrastructure/database/mongodb/MongoToDoItemRepository.ts` - Mongo item repo
- `backend/src/infrastructure/database/mongodb/connection.ts` - Mongo connection
- `backend/src/infrastructure/database/mongodb/schemas/UserSchema.ts` - Mongoose user schema
- `backend/src/infrastructure/database/mongodb/schemas/ToDoListSchema.ts` - Mongoose list schema
- `backend/src/infrastructure/database/mongodb/schemas/ToDoItemSchema.ts` - Mongoose item schema
- `backend/src/infrastructure/database/factory/RepositoryFactory.ts` - Repository factory pattern

**Infrastructure Layer - Web:**
- `backend/src/infrastructure/web/express/app.ts` - Express app setup
- `backend/src/infrastructure/web/controllers/AuthController.ts` - Authentication endpoints
- `backend/src/infrastructure/web/controllers/ToDoListController.ts` - List CRUD endpoints
- `backend/src/infrastructure/web/controllers/ToDoItemController.ts` - Item CRUD endpoints
- `backend/src/infrastructure/web/middleware/authenticate.ts` - JWT verification middleware
- `backend/src/infrastructure/web/middleware/authorize.ts` - Ownership verification
- `backend/src/infrastructure/web/middleware/errorHandler.ts` - Global error handler
- `backend/src/infrastructure/web/middleware/validator.ts` - Request validation
- `backend/src/infrastructure/web/routes/authRoutes.ts` - Auth route definitions
- `backend/src/infrastructure/web/routes/listRoutes.ts` - List route definitions
- `backend/src/infrastructure/web/routes/itemRoutes.ts` - Item route definitions

**Configuration & Entry:**
- `backend/src/index.ts` - Application entry point
- `backend/package.json` - Dependencies and scripts
- `backend/tsconfig.json` - TypeScript configuration
- `backend/.env.example` - Environment variables template
- `backend/Dockerfile` - Backend Docker image

**Database Seeds:**
- `backend/src/infrastructure/database/seeds/seed-data.ts` - Seed data definitions
- `backend/src/infrastructure/database/seeds/seed-postgres.ts` - Postgres seeder
- `backend/src/infrastructure/database/seeds/seed-mongo.ts` - MongoDB seeder

### Frontend Files

**Domain:**
- `frontend/src/domain/User.ts` - User DTO
- `frontend/src/domain/ToDoList.ts` - ToDoList DTO
- `frontend/src/domain/ToDoItem.ts` - ToDoItem DTO

**Application Layer:**
- `frontend/src/application/context/AuthContext.tsx` - Authentication context provider
- `frontend/src/application/hooks/useAuth.ts` - Authentication hook
- `frontend/src/application/hooks/useToDoLists.ts` - ToDoLists data hook
- `frontend/src/application/hooks/useToDoItems.ts` - ToDoItems data hook

**Infrastructure:**
- `frontend/src/infrastructure/api/apiClient.ts` - Axios instance with auth interceptor
- `frontend/src/infrastructure/api/authApi.ts` - Auth API calls
- `frontend/src/infrastructure/api/toDoListApi.ts` - List API calls
- `frontend/src/infrastructure/api/toDoItemApi.ts` - Item API calls
- `frontend/src/infrastructure/auth/tokenStorage.ts` - Token localStorage management

**Presentation:**
- `frontend/src/presentation/components/auth/LoginForm.tsx` - Login form component
- `frontend/src/presentation/components/auth/RegisterForm.tsx` - Registration form
- `frontend/src/presentation/components/auth/ProtectedRoute.tsx` - Route guard component
- `frontend/src/presentation/components/layout/Header.tsx` - App header with user info
- `frontend/src/presentation/components/layout/Navbar.tsx` - Navigation bar
- `frontend/src/presentation/components/ToDoListCard.tsx` - List card component
- `frontend/src/presentation/components/ToDoItemRow.tsx` - Item row component
- `frontend/src/presentation/components/CreateListModal.tsx` - Create list modal
- `frontend/src/presentation/components/CreateItemModal.tsx` - Create item modal
- `frontend/src/presentation/pages/Login.tsx` - Login page
- `frontend/src/presentation/pages/Register.tsx` - Registration page
- `frontend/src/presentation/pages/ListsOverview.tsx` - Main lists view
- `frontend/src/presentation/pages/ListDetail.tsx` - List detail view
- `frontend/src/presentation/layouts/AuthLayout.tsx` - Layout for auth pages
- `frontend/src/presentation/layouts/MainLayout.tsx` - Layout for main app
- `frontend/src/App.tsx` - App router and providers

**Configuration:**
- `frontend/package.json` - Dependencies and scripts
- `frontend/tsconfig.json` - TypeScript configuration
- `frontend/tailwind.config.js` - Tailwind CSS configuration
- `frontend/vite.config.ts` - Vite build configuration
- `frontend/.env.example` - Environment variables template
- `frontend/Dockerfile` - Frontend Docker image

### Docker & Documentation

- `docker-compose.yml` - Multi-container orchestration
- `README.md` - Project overview and setup instructions
- `ARCHITECTURE.md` - Clean Architecture documentation
- `.gitignore` - Git ignore patterns

### Notes

- Tests should be placed alongside the code files they test (e.g., `User.test.ts` next to `User.ts`)
- Run backend tests with: `cd backend && npm test`
- Run frontend tests with: `cd frontend && npm test`
- Use `docker-compose up` to start all services

---

## Tasks

- [x] 1.0 Project Setup & Initial Structure
  - [x] 1.1 Create monorepo directory structure with `/backend` and `/frontend` folders
  - [x] 1.2 Initialize backend Node.js/TypeScript project (`npm init`, install TypeScript, ts-node, etc.)
  - [x] 1.3 Create backend folder structure following Clean Architecture layers (domain, application, infrastructure)
  - [x] 1.4 Configure TypeScript for backend (`tsconfig.json` with strict mode, path aliases for clean imports)
  - [x] 1.5 Initialize frontend React/TypeScript project using Vite (`npm create vite@latest`)
  - [x] 1.6 Install frontend dependencies (React Router, Tailwind CSS, Axios, Framer Motion, React Query)
  - [x] 1.7 Configure Tailwind CSS in frontend
  - [x] 1.8 Create `.env.example` files for both backend and frontend
  - [x] 1.9 Create `.gitignore` file (ignore node_modules, .env, dist, build folders)
  - [x] 1.10 Install backend core dependencies (express, dotenv, cors, jsonwebtoken, bcrypt, pg, mongoose, zod)

- [x] 2.0 Implement Domain Layer (Core Business Logic)
  - [x] 2.1 Create `User` entity with properties: id, email, name, passwordHash, createdAt, updatedAt
  - [x] 2.2 Create `Email` value object with email format validation
  - [x] 2.3 Create `Password` value object with minimum length validation (min 8 characters)
  - [x] 2.4 Create `ToDoList` entity with properties: id, userId, title, createdAt, updatedAt
  - [x] 2.5 Create `ToDoItem` entity with properties: id, listId, title, description, isCompleted, startDate, deadlineDate, createdAt, updatedAt
  - [x] 2.6 Create `DateRange` value object that validates deadlineDate >= startDate
  - [x] 2.7 Add validation methods to entities (e.g., validateTitle length for ToDoList and ToDoItem)
  - [x] 2.8 Ensure domain layer has ZERO external dependencies (pure TypeScript)

- [x] 3.0 Implement Application Layer (Use Cases & Repository Interfaces)
  - [x] 3.1 Define `IUserRepository` interface with methods: create, findByEmail, findById, update, delete
  - [x] 3.2 Define `IToDoListRepository` interface with methods: create, findAllByUserId, findById, update, delete
  - [x] 3.3 Define `IToDoItemRepository` interface with methods: create, findByListId, findById, update, delete
  - [x] 3.4 Define `IPasswordHasher` service interface with methods: hash(password), compare(password, hash)
  - [x] 3.5 Define `ITokenService` service interface with methods: generate(userId, email), verify(token)
  - [x] 3.6 Implement `RegisterUser` use case (takes IUserRepository, IPasswordHasher; validates email uniqueness, hashes password)
  - [x] 3.7 Implement `LoginUser` use case (takes IUserRepository, IPasswordHasher, ITokenService; validates credentials, returns JWT)
  - [x] 3.8 Implement `GetCurrentUser` use case (takes IUserRepository; returns user by ID from token)
  - [x] 3.9 Implement `CreateToDoList` use case (takes IToDoListRepository; validates title, associates with userId)
  - [x] 3.10 Implement `GetAllToDoListsByUser` use case (takes IToDoListRepository; returns only user's lists)
  - [x] 3.11 Implement `GetToDoListById` use case (takes IToDoListRepository; verifies ownership)
  - [x] 3.12 Implement `UpdateToDoList` use case (takes IToDoListRepository; verifies ownership, validates new title)
  - [x] 3.13 Implement `DeleteToDoList` use case (takes IToDoListRepository; verifies ownership, cascades delete)
  - [x] 3.14 Implement `CreateToDoItem` use case (takes IToDoItemRepository, IToDoListRepository; verifies list ownership, validates dates)
  - [x] 3.15 Implement `GetItemsByList` use case (takes IToDoItemRepository, IToDoListRepository; verifies list ownership)
  - [x] 3.16 Implement `UpdateToDoItem` use case (takes IToDoItemRepository, IToDoListRepository; verifies ownership, validates dates)
  - [x] 3.17 Implement `ToggleItemCompletion` use case (takes IToDoItemRepository, IToDoListRepository; verifies ownership)
  - [x] 3.18 Implement `DeleteToDoItem` use case (takes IToDoItemRepository, IToDoListRepository; verifies ownership)

- [x] 4.0 Implement Infrastructure Layer (Database & Web API)
  - [x] 4.1 Implement `BcryptPasswordHasher` service using bcrypt with 10 salt rounds
  - [x] 4.2 Implement `JwtTokenService` using jsonwebtoken (sign with JWT_SECRET, 24h expiration)
  - [x] 4.3 Create PostgreSQL connection pool using `pg` library
  - [x] 4.4 Write PostgreSQL migration script `001_initial_schema.sql` (users, todo_lists, todo_items tables with constraints)
  - [x] 4.5 Implement `PostgresUserRepository` with SQL queries for all IUserRepository methods
  - [x] 4.6 Implement `PostgresToDoListRepository` with SQL queries and CASCADE delete support
  - [x] 4.7 Implement `PostgresToDoItemRepository` with SQL queries and date constraint checks
  - [x] 4.8 Create MongoDB connection using Mongoose
  - [x] 4.9 Define Mongoose schemas: UserSchema, ToDoListSchema, ToDoItemSchema (with validation)
  - [x] 4.10 Implement `MongoUserRepository` using Mongoose models
  - [x] 4.11 Implement `MongoToDoListRepository` using Mongoose models
  - [x] 4.12 Implement `MongoToDoItemRepository` using Mongoose models
  - [x] 4.13 Implement `RepositoryFactory` that returns correct repository based on DB_TYPE env variable
  - [x] 4.14 Create Express app setup with JSON parsing, CORS, and error handling middleware
  - [x] 4.15 Implement `authenticate` middleware to verify JWT and attach userId to request
  - [x] 4.16 Implement `authorize` middleware to verify resource ownership (for lists and items)
  - [x] 4.17 Implement global `errorHandler` middleware for consistent error responses
  - [x] 4.18 Implement `validator` middleware using Zod for request body validation
  - [x] 4.19 Implement `AuthController` with endpoints: POST /auth/register, POST /auth/login, GET /auth/me
  - [x] 4.20 Implement `ToDoListController` with all CRUD endpoints (all protected)
  - [x] 4.21 Implement `ToDoItemController` with all CRUD endpoints (all protected)
  - [x] 4.22 Define Express routes for auth (public), lists (protected), and items (protected)
  - [x] 4.23 Create seed data file with 2 users, 3 lists, 6 items (hashed passwords)
  - [x] 4.24 Create seed script for PostgreSQL
  - [x] 4.25 Create seed script for MongoDB
  - [x] 4.26 Create main `index.ts` entry point that starts Express server and connects to database

- [x] 5.0 Implement Frontend Application (React UI)
  - [x] 5.1 Create User, ToDoList, ToDoItem TypeScript interfaces/types
  - [x] 5.2 Implement `tokenStorage.ts` utility (saveToken, getToken, removeToken using localStorage)
  - [x] 5.3 Create Axios client instance with base URL and auth token interceptor
  - [x] 5.4 Implement `authApi.ts` with register, login, getCurrentUser API calls
  - [x] 5.5 Implement `toDoListApi.ts` with all list CRUD API calls
  - [x] 5.6 Implement `toDoItemApi.ts` with all item CRUD API calls
  - [x] 5.7 Create `AuthContext` provider with login, logout, register, currentUser state
  - [x] 5.8 Implement `useAuth` hook to access AuthContext
  - [x] 5.9 Implement `useToDoLists` hook with React Query (fetch, create, update, delete)
  - [x] 5.10 Implement `useToDoItems` hook with React Query (fetch, create, update, toggle, delete)
  - [x] 5.11 Create `ProtectedRoute` component that redirects to login if not authenticated
  - [x] 5.12 Create `LoginForm` component with email/password fields, validation, error handling
  - [x] 5.13 Create `RegisterForm` component with name/email/password fields, validation
  - [x] 5.14 Create `Login` page that uses LoginForm
  - [x] 5.15 Create `Register` page that uses RegisterForm
  - [x] 5.16 Create `Header` component displaying user name/email and logout button
  - [x] 5.17 Create `ToDoListCard` component with title, item count, edit/delete buttons
  - [x] 5.18 Create `CreateListModal` component with form to create new list
  - [x] 5.19 Create `ListsOverview` page displaying all user's lists in a grid
  - [x] 5.20 Create `ToDoItemRow` component with checkbox, title, dates, overdue indicator, edit/delete buttons
  - [x] 5.21 Create `CreateItemModal` component with form for title, description, dates
  - [x] 5.22 Create `ListDetail` page displaying all items in a list with create button
  - [x] 5.23 Implement visual status indicators (red for overdue, yellow for upcoming, gray for completed)
  - [x] 5.24 Add Framer Motion animations for list/item creation, deletion, checkbox toggle
  - [x] 5.25 Create `AuthLayout` for login/register pages (centered, minimal)
  - [x] 5.26 Create `MainLayout` with Header and main content area
  - [x] 5.27 Set up React Router with routes: /login, /register, / (lists), /lists/:id (items)
  - [x] 5.28 Implement route protection so unauthenticated users redirect to /login
  - [x] 5.29 Add loading states and error toasts using a toast library (react-hot-toast or similar)
  - [x] 5.30 Apply Tailwind CSS styling following the color palette from PRD (indigo primary, gray backgrounds)
  - [ ] 5.31 Make UI fully responsive (mobile, tablet, desktop breakpoints)

- [ ] 6.0 Docker Configuration & Deployment Setup
  - [ ] 6.1 Create backend `Dockerfile` (Node 20 Alpine, install deps, build TypeScript, expose port 3000)
  - [ ] 6.2 Create frontend `Dockerfile` (Node 20 Alpine, install deps, build with Vite, serve with nginx or node)
  - [ ] 6.3 Create `docker-compose.yml` with services: postgres, mongo, backend, frontend
  - [ ] 6.4 Configure postgres service with health checks and volume for data persistence
  - [ ] 6.5 Configure mongo service with health checks and volume for data persistence
  - [ ] 6.6 Configure backend service to depend on postgres and mongo, pass DB_TYPE env variable
  - [ ] 6.7 Configure frontend service to depend on backend, pass VITE_API_URL env variable
  - [ ] 6.8 Add volume mounts for database initialization scripts (migrations)
  - [ ] 6.9 Test `docker-compose up` with DB_TYPE=postgres
  - [ ] 6.10 Test switching to DB_TYPE=mongo and verify application works

- [ ] 7.0 Documentation, Testing & Polish
  - [ ] 7.1 Write unit tests for domain entities (User, ToDoList, ToDoItem validation)
  - [ ] 7.2 Write unit tests for value objects (Email, Password, DateRange)
  - [ ] 7.3 Write unit tests for key use cases (RegisterUser, LoginUser, CreateToDoList)
  - [ ] 7.4 Write comprehensive `README.md` with project overview, architecture diagram, setup instructions
  - [ ] 7.5 Create `ARCHITECTURE.md` documenting Clean Architecture layers and dependency rules
  - [ ] 7.6 Document all API endpoints in README or create API documentation (consider adding Swagger)
  - [ ] 7.7 Add JSDoc comments to all public methods in use cases and repositories
  - [ ] 7.8 Create setup instructions for running with PostgreSQL vs MongoDB
  - [ ] 7.9 Add troubleshooting section to README for common issues
  - [ ] 7.10 Test all features end-to-end: register → login → create list → add items → mark complete → delete
  - [ ] 7.11 Verify authorization: ensure users cannot access other users' data
  - [ ] 7.12 Security audit: check JWT expiration, password hashing, SQL injection prevention
  - [ ] 7.13 Performance check: ensure queries use indexes, optimize N+1 queries
  - [ ] 7.14 UI polish: ensure all animations are smooth, loading states are clear
  - [ ] 7.15 Final code review: check for any violations of Clean Architecture principles (no domain dependencies on infrastructure)

---

**Status:** ✅ Complete - All tasks with sub-tasks generated  
**Total Tasks:** 7 parent tasks, 115+ sub-tasks  
**Estimated Timeline:** 2-3 weeks for full implementation  

**Recommended Order:** Follow tasks 1.0 → 7.0 sequentially. Within each parent task, sub-tasks are ordered to minimize dependencies.

