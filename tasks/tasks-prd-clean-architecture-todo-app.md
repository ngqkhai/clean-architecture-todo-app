# Task List: Clean Architecture To-Do List Application

> Generated from: `prd-clean-architecture-todo-app.md`  
> Target Audience: Junior Developer implementing Clean Architecture  
> Estimated Total Time: 20-30 hours

---

## Relevant Files

### Backend - Domain Layer
- `backend/src/domain/entities/User.js` - User entity with email validation
- `backend/src/domain/entities/ToDoList.js` - ToDoList entity with title constraints
- `backend/src/domain/entities/ToDoItem.js` - ToDoItem entity with date validation business rules
- `backend/src/domain/errors/DomainError.js` - Custom domain error class

### Backend - Application Layer
- `backend/src/application/interfaces/IUserRepository.js` - User repository interface (port)
- `backend/src/application/interfaces/IToDoListRepository.js` - ToDoList repository interface (port)
- `backend/src/application/interfaces/IToDoItemRepository.js` - ToDoItem repository interface (port)
- `backend/src/application/use-cases/auth/RegisterUser.js` - Register user use case
- `backend/src/application/use-cases/auth/LoginUser.js` - Login user use case
- `backend/src/application/use-cases/lists/CreateToDoList.js` - Create list use case
- `backend/src/application/use-cases/lists/GetAllLists.js` - Get all user lists use case
- `backend/src/application/use-cases/lists/UpdateToDoList.js` - Update list use case
- `backend/src/application/use-cases/lists/DeleteToDoList.js` - Delete list use case
- `backend/src/application/use-cases/items/CreateToDoItem.js` - Create item use case
- `backend/src/application/use-cases/items/GetItemsForList.js` - Get items for list use case
- `backend/src/application/use-cases/items/UpdateToDoItem.js` - Update item use case
- `backend/src/application/use-cases/items/ToggleItemCompletion.js` - Toggle item completion use case
- `backend/src/application/use-cases/items/DeleteToDoItem.js` - Delete item use case

### Backend - Infrastructure Layer (PostgreSQL)
- `backend/src/infrastructure/database/postgres/connection.js` - PostgreSQL connection pool
- `backend/src/infrastructure/database/postgres/PostgresUserRepository.js` - Postgres user repository implementation
- `backend/src/infrastructure/database/postgres/PostgresToDoListRepository.js` - Postgres list repository implementation
- `backend/src/infrastructure/database/postgres/PostgresToDoItemRepository.js` - Postgres item repository implementation

### Backend - Infrastructure Layer (MongoDB)
- `backend/src/infrastructure/database/mongo/connection.js` - MongoDB connection client
- `backend/src/infrastructure/database/mongo/MongoUserRepository.js` - Mongo user repository implementation
- `backend/src/infrastructure/database/mongo/MongoToDoListRepository.js` - Mongo list repository implementation
- `backend/src/infrastructure/database/mongo/MongoToDoItemRepository.js` - Mongo item repository implementation

### Backend - Infrastructure Layer (Web & Factory)
- `backend/src/infrastructure/factories/RepositoryFactory.js` - Database selection factory (KEY for swappability)
- `backend/src/infrastructure/web/server.js` - Express server setup
- `backend/src/infrastructure/web/routes/authRoutes.js` - Authentication routes
- `backend/src/infrastructure/web/routes/listRoutes.js` - ToDoList routes
- `backend/src/infrastructure/web/routes/itemRoutes.js` - ToDoItem routes

### Backend - Adapters Layer
- `backend/src/adapters/controllers/AuthController.js` - Auth endpoints controller
- `backend/src/adapters/controllers/ToDoListController.js` - List endpoints controller
- `backend/src/adapters/controllers/ToDoItemController.js` - Item endpoints controller
- `backend/src/adapters/middlewares/authMiddleware.js` - JWT validation middleware
- `backend/src/adapters/presenters/ResponseFormatter.js` - Response formatting utility

### Backend - Configuration
- `backend/src/config/config.js` - Environment variables and config
- `backend/package.json` - Backend dependencies
- `backend/.env.example` - Example environment variables
- `backend/Dockerfile` - Backend container configuration

### Database Files
- `database/postgres/schema.sql` - PostgreSQL database schema
- `database/postgres/seed.sql` - PostgreSQL seed data
- `database/mongo/schema.md` - MongoDB schema documentation
- `database/mongo/seed.json` - MongoDB seed data

### Frontend Files
- `frontend/src/App.tsx` - Main app component with routing
- `frontend/src/index.tsx` - React entry point
- `frontend/src/context/AuthContext.tsx` - Authentication context provider
- `frontend/src/services/api.ts` - Axios/Fetch API wrapper
- `frontend/src/services/authService.ts` - Authentication API calls
- `frontend/src/services/listService.ts` - ToDoList API calls
- `frontend/src/services/itemService.ts` - ToDoItem API calls
- `frontend/src/components/LoginForm.tsx` - Login form component
- `frontend/src/components/RegisterForm.tsx` - Registration form component
- `frontend/src/components/Header.tsx` - Navigation header with logout
- `frontend/src/components/ToDoListCard.tsx` - Single list card component
- `frontend/src/components/ToDoItemRow.tsx` - Single item row component
- `frontend/src/components/CreateListModal.tsx` - Modal for creating/editing lists
- `frontend/src/components/CreateItemModal.tsx` - Modal for creating/editing items
- `frontend/src/pages/Login.tsx` - Login page
- `frontend/src/pages/Register.tsx` - Registration page
- `frontend/src/pages/ListsOverview.tsx` - All lists overview page
- `frontend/src/pages/ListDetail.tsx` - Single list detail page
- `frontend/src/index.css` - Global styles with color palette
- `frontend/package.json` - Frontend dependencies
- `frontend/tsconfig.json` - TypeScript configuration
- `frontend/Dockerfile` - Frontend container configuration

### Docker & Root Files
- `docker-compose.yml` - Multi-container orchestration (app, postgres, mongo)
- `README.md` - Project documentation with architecture explanation

### Notes
- Testing is minimal as per PRD (focus on architecture, not extensive tests)
- Files are organized by Clean Architecture layers (domain → application → adapters → infrastructure)
- Repository interfaces in application layer enable database swapping
- Factory pattern in infrastructure layer implements the switching mechanism

---

## Tasks

- [x] 1.0 Project Setup & Infrastructure Foundation
  - [x] 1.1 Create root project directory structure (`backend/`, `frontend/`, `database/`, `tasks/`)
  - [x] 1.2 Initialize backend Node.js project (`npm init -y` in `backend/`)
  - [x] 1.3 Install backend dependencies: `express`, `pg`, `mongodb`, `bcrypt`, `jsonwebtoken`, `dotenv`, `uuid`, `cors`
  - [x] 1.4 Create Clean Architecture folder structure in `backend/src/` (domain, application, adapters, infrastructure, config)
  - [x] 1.5 Initialize frontend React + TypeScript project using Vite or Create React App in `frontend/`
  - [x] 1.6 Install frontend dependencies: `react-router-dom`, `axios`, `tailwindcss` (or preferred CSS solution)
  - [x] 1.7 Create `docker-compose.yml` with services: `postgres`, `mongo`, `backend`, `frontend`
  - [x] 1.8 Create `database/postgres/` and `database/mongo/` directories for schema and seed files
  - [x] 1.9 Create backend `Dockerfile` (Node.js base image, copy source, install deps, expose port)
  - [x] 1.10 Create frontend `Dockerfile` (Node.js for build, nginx for serve, or dev server)
  - [x] 1.11 Create backend `.env.example` with variables: `DB_TYPE`, `POSTGRES_*`, `MONGO_URI`, `JWT_SECRET`, `PORT`
  - [x] 1.12 Test Docker Compose: `docker-compose up` should start Postgres and Mongo successfully

- [x] 2.0 Implement Domain Layer (Entities & Business Rules)
  - [x] 2.1 Create `backend/src/domain/errors/DomainError.js` - Base error class for domain validation failures
  - [x] 2.2 Create `backend/src/domain/entities/User.js` entity with:
    - Constructor accepting `id`, `email`, `passwordHash`, `createdAt`, `updatedAt`
    - Email validation method (regex for email format)
    - Static factory method `create()` for new users
    - Method to validate email uniqueness (will call repository in use case)
  - [x] 2.3 Create `backend/src/domain/entities/ToDoList.js` entity with:
    - Constructor accepting `id`, `title`, `userId`, `createdAt`, `updatedAt`
    - Title validation (required, max 100 chars)
    - Static factory method `create()` for new lists
  - [x] 2.4 Create `backend/src/domain/entities/ToDoItem.js` entity with:
    - Constructor accepting `id`, `title`, `description`, `isCompleted`, `listId`, `userId`, `startDate`, `deadlineDate`, `createdAt`, `updatedAt`
    - Title validation (required, max 200 chars)
    - Description validation (max 1000 chars)
    - **Business rule validation:** `deadlineDate` must not be before `startDate` (throw DomainError if violated)
    - Static factory method `create()` for new items
    - Method `toggleCompletion()` to flip `isCompleted` status
  - [x] 2.5 Add JSDoc comments to all entity classes explaining their business purpose

- [x] 3.0 Implement Application Layer (Use Cases & Repository Interfaces)
  - [x] 3.1 Define `backend/src/application/interfaces/IUserRepository.js` with methods:
    - `createUser(user)` - returns created user
    - `findUserByEmail(email)` - returns user or null
    - `findUserById(id)` - returns user or null
  - [x] 3.2 Define `backend/src/application/interfaces/IToDoListRepository.js` with methods:
    - `createList(list)` - returns created list
    - `findAllByUserId(userId)` - returns array of lists
    - `findById(id)` - returns list or null
    - `updateList(id, updates)` - returns updated list
    - `deleteList(id)` - returns boolean success
  - [x] 3.3 Define `backend/src/application/interfaces/IToDoItemRepository.js` with methods:
    - `createItem(item)` - returns created item
    - `findAllByListId(listId)` - returns array of items
    - `findById(id)` - returns item or null
    - `updateItem(id, updates)` - returns updated item
    - `deleteItem(id)` - returns boolean success
  - [x] 3.4 Implement `backend/src/application/use-cases/auth/RegisterUser.js`:
    - Constructor accepts `userRepository`
    - `execute(email, password)` method validates input, hashes password with bcrypt, creates User entity, saves via repository
    - Throws error if email already exists
  - [x] 3.5 Implement `backend/src/application/use-cases/auth/LoginUser.js`:
    - Constructor accepts `userRepository`
    - `execute(email, password)` method finds user by email, compares password with bcrypt, returns user if valid
    - Throws error if credentials invalid
  - [x] 3.6 Implement `backend/src/application/use-cases/lists/CreateToDoList.js`:
    - Constructor accepts `listRepository`
    - `execute(title, userId)` creates ToDoList entity, validates, saves via repository
  - [x] 3.7 Implement `backend/src/application/use-cases/lists/GetAllLists.js`:
    - Constructor accepts `listRepository`
    - `execute(userId)` fetches all lists for the user
  - [x] 3.8 Implement `backend/src/application/use-cases/lists/UpdateToDoList.js`:
    - Constructor accepts `listRepository`
    - `execute(listId, userId, newTitle)` validates ownership, updates title
  - [x] 3.9 Implement `backend/src/application/use-cases/lists/DeleteToDoList.js`:
    - Constructor accepts `listRepository`
    - `execute(listId, userId)` validates ownership, deletes list (cascade delete items in repository)
  - [x] 3.10 Implement `backend/src/application/use-cases/items/CreateToDoItem.js`:
    - Constructor accepts `itemRepository` and `listRepository`
    - `execute(listId, userId, itemData)` validates list ownership, creates ToDoItem entity (validates dates), saves
  - [x] 3.11 Implement `backend/src/application/use-cases/items/GetItemsForList.js`:
    - Constructor accepts `itemRepository` and `listRepository`
    - `execute(listId, userId)` validates list ownership, fetches items
  - [x] 3.12 Implement `backend/src/application/use-cases/items/UpdateToDoItem.js`:
    - Constructor accepts `itemRepository`
    - `execute(itemId, userId, updates)` validates ownership, updates item, re-validates date business rule
  - [x] 3.13 Implement `backend/src/application/use-cases/items/ToggleItemCompletion.js`:
    - Constructor accepts `itemRepository`
    - `execute(itemId, userId)` validates ownership, toggles `isCompleted`
  - [x] 3.14 Implement `backend/src/application/use-cases/items/DeleteToDoItem.js`:
    - Constructor accepts `itemRepository`
    - `execute(itemId, userId)` validates ownership, deletes item

- [x] 4.0 Implement Infrastructure Layer (Database Implementations & Web Framework)
  - [x] 4.1 Create `database/postgres/schema.sql` with:
    - UUID extension setup
    - `users`, `todo_lists`, `todo_items` tables with proper foreign keys and cascade deletes
    - Indexes on `user_id` and `list_id` columns
    - CHECK constraint for date validation on `todo_items`
  - [x] 4.2 Create `database/postgres/seed.sql` with sample data:
    - 2-3 sample users with bcrypt hashed passwords
    - 5-7 sample lists across users
    - 10-15 sample items with various dates and completion statuses
  - [x] 4.3 Create `database/mongo/schema.md` documenting the collections and field structure
  - [x] 4.4 Create `database/mongo/seed.json` with equivalent sample data (matching Postgres seed)
  - [x] 4.5 Implement `backend/src/infrastructure/database/postgres/connection.js`:
    - Create and export PostgreSQL connection pool using `pg` library
    - Use environment variables for connection (POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD)
  - [x] 4.6 Implement `backend/src/infrastructure/database/postgres/PostgresUserRepository.js`:
    - Implements `IUserRepository` interface
    - `createUser()` uses SQL INSERT with UUID generation
    - `findUserByEmail()` uses SQL SELECT with email filter
    - `findUserById()` uses SQL SELECT with id filter
  - [x] 4.7 Implement `backend/src/infrastructure/database/postgres/PostgresToDoListRepository.js`:
    - Implements `IToDoListRepository` interface
    - All CRUD methods using SQL queries
    - `deleteList()` relies on CASCADE DELETE for items
  - [x] 4.8 Implement `backend/src/infrastructure/database/postgres/PostgresToDoItemRepository.js`:
    - Implements `IToDoItemRepository` interface
    - All CRUD methods using SQL queries
    - Properly handles optional `startDate` and `deadlineDate` fields
  - [x] 4.9 Implement `backend/src/infrastructure/database/mongo/connection.js`:
    - Create and export MongoDB client connection using `mongodb` driver
    - Use MONGO_URI environment variable
  - [x] 4.10 Implement `backend/src/infrastructure/database/mongo/MongoUserRepository.js`:
    - Implements `IUserRepository` interface
    - Uses `users` collection
    - Converts ObjectId to string for consistency with Postgres UUID
  - [x] 4.11 Implement `backend/src/infrastructure/database/mongo/MongoToDoListRepository.js`:
    - Implements `IToDoListRepository` interface
    - Uses `todoLists` collection
    - `deleteList()` manually deletes associated items (no cascade in Mongo)
  - [x] 4.12 Implement `backend/src/infrastructure/database/mongo/MongoToDoItemRepository.js`:
    - Implements `IToDoItemRepository` interface
    - Uses `todoItems` collection
  - [x] 4.13 Implement `backend/src/infrastructure/factories/RepositoryFactory.js`:
    - Read `DB_TYPE` from environment (`postgres` or `mongo`)
    - Export function `createRepositories()` that returns object with `userRepository`, `listRepository`, `itemRepository`
    - Instantiates correct implementations based on `DB_TYPE`
    - Throws error if DB_TYPE is unsupported
  - [x] 4.14 Create `backend/src/config/config.js`:
    - Load and export all environment variables (PORT, DB_TYPE, JWT_SECRET, database connection strings)
    - Provide defaults where appropriate

- [x] 5.0 Implement Adapters Layer (Controllers & Middleware)
  - [x] 5.1 Implement `backend/src/adapters/presenters/ResponseFormatter.js`:
    - Utility functions for consistent API responses: `success(data)`, `error(message, statusCode)`
  - [x] 5.2 Implement `backend/src/adapters/middlewares/authMiddleware.js`:
    - Middleware function that extracts JWT from `Authorization: Bearer <token>` header
    - Verifies JWT using `JWT_SECRET`
    - Attaches decoded user data to `req.user` (should contain `userId`)
    - Returns 401 if token missing or invalid
  - [x] 5.3 Implement `backend/src/adapters/controllers/AuthController.js`:
    - Constructor accepts `registerUserUseCase`, `loginUserUseCase`
    - `register(req, res)` endpoint: calls RegisterUser use case, returns success or error
    - `login(req, res)` endpoint: calls LoginUser use case, signs JWT with user id, returns token and user info
  - [x] 5.4 Implement `backend/src/adapters/controllers/ToDoListController.js`:
    - Constructor accepts all list-related use cases
    - `getAllLists(req, res)` - uses `req.user.userId` to get user's lists
    - `createList(req, res)` - creates list for authenticated user
    - `updateList(req, res)` - updates list with ownership validation
    - `deleteList(req, res)` - deletes list with ownership validation
  - [x] 5.5 Implement `backend/src/adapters/controllers/ToDoItemController.js`:
    - Constructor accepts all item-related use cases
    - `getItemsForList(req, res)` - fetches items for a specific list
    - `createItem(req, res)` - creates item in a list
    - `updateItem(req, res)` - updates item with ownership validation
    - `toggleCompletion(req, res)` - toggles item completion status
    - `deleteItem(req, res)` - deletes item with ownership validation
  - [x] 5.6 Implement `backend/src/infrastructure/web/routes/authRoutes.js`:
    - Define routes: `POST /api/auth/register`, `POST /api/auth/login`
    - Wire routes to AuthController methods
  - [x] 5.7 Implement `backend/src/infrastructure/web/routes/listRoutes.js`:
    - Define protected routes (apply authMiddleware): `GET /api/lists`, `POST /api/lists`, `PUT /api/lists/:id`, `DELETE /api/lists/:id`
    - Wire routes to ToDoListController methods
  - [x] 5.8 Implement `backend/src/infrastructure/web/routes/itemRoutes.js`:
    - Define protected routes: `GET /api/lists/:listId/items`, `POST /api/lists/:listId/items`, `PUT /api/items/:id`, `PATCH /api/items/:id/toggle`, `DELETE /api/items/:id`
    - Wire routes to ToDoItemController methods
  - [x] 5.9 Implement `backend/src/infrastructure/web/server.js`:
    - Create Express app
    - Apply middleware: `express.json()`, `cors()`
    - Use RepositoryFactory to create repositories
    - Instantiate all use cases with repositories
    - Instantiate all controllers with use cases
    - Mount routes: `/api/auth`, `/api/lists`, `/api/items`
    - Add global error handling middleware
    - Start server on port from config
  - [x] 5.10 Create backend entry point `backend/src/index.js` that imports and runs server

- [ ] 6.0 Build Frontend Application (React + TypeScript)
  - [ ] 6.1 Configure Tailwind CSS with the custom color palette:
    - Extend theme with colors: `background: '#F9F7F7'`, `secondary: '#DBE2EF'`, `accent: '#3F72AF'`, `text: '#112D4E'`
  - [ ] 6.2 Create `frontend/src/services/api.ts`:
    - Configure Axios instance with base URL pointing to backend
    - Add request interceptor to attach JWT token from localStorage to `Authorization` header
    - Add response interceptor to handle 401 errors (redirect to login)
  - [ ] 6.3 Create `frontend/src/services/authService.ts`:
    - `register(email, password)` - POST to `/api/auth/register`
    - `login(email, password)` - POST to `/api/auth/login`, store JWT in localStorage
    - `logout()` - clear JWT from localStorage
    - `getToken()` - retrieve JWT from localStorage
    - `isAuthenticated()` - check if JWT exists
  - [ ] 6.4 Create `frontend/src/services/listService.ts`:
    - `getAllLists()` - GET from `/api/lists`
    - `createList(title)` - POST to `/api/lists`
    - `updateList(id, title)` - PUT to `/api/lists/:id`
    - `deleteList(id)` - DELETE to `/api/lists/:id`
  - [ ] 6.5 Create `frontend/src/services/itemService.ts`:
    - `getItemsForList(listId)` - GET from `/api/lists/:listId/items`
    - `createItem(listId, itemData)` - POST to `/api/lists/:listId/items`
    - `updateItem(id, itemData)` - PUT to `/api/items/:id`
    - `toggleCompletion(id)` - PATCH to `/api/items/:id/toggle`
    - `deleteItem(id)` - DELETE to `/api/items/:id`
  - [ ] 6.6 Create `frontend/src/context/AuthContext.tsx`:
    - Provide authentication state (user, isAuthenticated)
    - Provide login, logout, register functions
    - Use authService for API calls
  - [ ] 6.7 Implement `frontend/src/components/LoginForm.tsx`:
    - Form with email and password inputs
    - Submit calls AuthContext login function
    - Display validation errors
    - Style with color palette (accent blue button, navy text)
  - [ ] 6.8 Implement `frontend/src/components/RegisterForm.tsx`:
    - Form with email, password, confirm password inputs
    - Client-side validation (password match, min length)
    - Submit calls AuthContext register function
    - Style with color palette
  - [ ] 6.9 Implement `frontend/src/components/Header.tsx`:
    - App title/logo
    - Logout button (visible when authenticated)
    - Navigation back to lists overview
    - Background: secondary blue (#DBE2EF), text: navy (#112D4E)
  - [ ] 6.10 Implement `frontend/src/components/ToDoListCard.tsx`:
    - Display list title
    - Buttons for "View", "Edit", "Delete"
    - Click navigates to list detail page
    - Card background: secondary blue, hover effect with accent blue border
  - [ ] 6.11 Implement `frontend/src/components/ToDoItemRow.tsx`:
    - Checkbox for completion status
    - Display title, description (truncated), start date, deadline
    - Buttons for "Edit", "Delete"
    - Strike-through style when completed
    - Show deadline in red if overdue
  - [ ] 6.12 Implement `frontend/src/components/CreateListModal.tsx`:
    - Modal overlay with form
    - Input for list title
    - "Create" and "Cancel" buttons
    - Can be reused for editing (pre-fill title)
  - [ ] 6.13 Implement `frontend/src/components/CreateItemModal.tsx`:
    - Modal overlay with form
    - Inputs for title, description, start date, deadline date
    - Date inputs using HTML5 date pickers
    - "Create" and "Cancel" buttons
    - Can be reused for editing
  - [ ] 6.14 Implement `frontend/src/pages/Login.tsx`:
    - Render LoginForm component
    - Link to Register page
    - Center content on warm off-white background (#F9F7F7)
  - [ ] 6.15 Implement `frontend/src/pages/Register.tsx`:
    - Render RegisterForm component
    - Link to Login page
    - Center content on warm off-white background
  - [ ] 6.16 Implement `frontend/src/pages/ListsOverview.tsx`:
    - Fetch all lists on mount using listService
    - Display lists as grid of ToDoListCard components
    - "Create New List" button (opens CreateListModal)
    - Handle delete (confirm, then call deleteList)
    - Show empty state if no lists
  - [ ] 6.17 Implement `frontend/src/pages/ListDetail.tsx`:
    - Get listId from URL params (React Router)
    - Fetch items for list on mount using itemService
    - Display list title as header
    - Display items as ToDoItemRow components
    - "Add New Item" button (opens CreateItemModal)
    - Handle toggle completion, edit, delete
    - Back button to return to ListsOverview
  - [ ] 6.18 Implement `frontend/src/App.tsx`:
    - Set up React Router with routes: `/login`, `/register`, `/lists`, `/lists/:id`
    - Wrap app in AuthContext provider
    - Implement protected routes (redirect to login if not authenticated)
    - Redirect from `/` to `/lists` if authenticated, else `/login`
  - [ ] 6.19 Style `frontend/src/index.css`:
    - Apply global styles with color palette
    - Set body background to #F9F7F7
    - Define button styles with accent blue (#3F72AF)
    - Define text styles with navy (#112D4E)
    - Ensure responsive design basics
  - [ ] 6.20 Update `frontend/public/index.html` (or equivalent):
    - Set page title: "Clean To-Do | Clean Architecture Demo"
    - Add favicon (optional)

- [ ] 7.0 Integration, Testing & Documentation
  - [x] 7.1 Test backend with PostgreSQL:
    - Set `DB_TYPE=postgres` in `.env`
    - Run `docker-compose up postgres backend`
    - Use Postman/Insomnia to test all API endpoints (register, login, CRUD lists, CRUD items)
    - Verify JWT authentication works
    - Verify date validation (try creating item with deadline before start date)
  - [ ] 7.2 Test backend with MongoDB:
    - Set `DB_TYPE=mongo` in `.env`
    - Run `docker-compose up mongo backend`
    - Repeat all API endpoint tests
    - Verify same functionality works with Mongo
  - [ ] 7.3 Test frontend integration:
    - Run `docker-compose up` (all services)
    - Test user registration and login flow
    - Create multiple lists
    - Create items with dates in different lists
    - Test edit, delete, toggle completion
    - Verify UI styling matches color palette
    - Test responsive design on mobile viewport
  - [ ] 7.4 Test database switching without code changes:
    - Stop backend, change `DB_TYPE` env var, restart backend
    - Verify app works with both databases without modifying any Use Case code
    - Document this process with screenshots
  - [ ] 7.5 Write comprehensive `README.md`:
    - Project overview and goals
    - Clean Architecture explanation with diagram (show 4 layers and dependency direction)
    - Technology stack
    - Setup instructions (prerequisites, clone, install, configure .env)
    - How to run with Docker Compose
    - How to switch databases (change DB_TYPE, restart)
    - API endpoint documentation (or link to Postman collection)
    - Architecture decisions and design patterns used
    - Screenshots of the UI
    - Future improvements section
  - [ ] 7.6 Create architecture diagram:
    - Visual representation of layers (Domain → Application → Adapters → Infrastructure)
    - Show dependency flow (inward arrows)
    - Highlight Repository Interface as the key abstraction
    - Include in README or as separate file
  - [ ] 7.7 Code cleanup and documentation:
    - Add JSDoc comments to all public methods
    - Remove any console.logs or debug code
    - Ensure consistent code formatting
    - Add inline comments for complex business logic
  - [ ] 7.8 Create `.env.example` files:
    - Backend example with all required variables and placeholder values
    - Add comments explaining each variable
  - [ ] 7.9 Final testing checklist:
    - [x] User can register and login
    - [x] User can create, view, edit, delete lists
    - [x] User can create, view, edit, delete items
    - [x] User can toggle item completion
    - [x] Date validation prevents invalid date ranges
    - [x] Users only see their own data
    - [x] JWT authentication protects all routes
    - [x] App works with PostgreSQL
    - [ ] App works with MongoDB
    - [x] Database can be switched via env var
    - [ ] UI is responsive and matches color palette
    - [ ] No errors in browser console
  - [ ] 7.10 Optional: Create demo video or GIF:
    - Screen recording showing: login, creating lists/items, database switching
    - Add to README for visual appeal

---

## Implementation Tips

### Clean Architecture Best Practices
1. **Start from the inside out:** Domain → Application → Infrastructure → Adapters → UI
2. **Keep entities pure:** No framework dependencies in domain layer
3. **Use dependency injection:** Pass repositories to use cases via constructor
4. **Validate in entities:** Business rules belong in the domain layer
5. **Keep use cases thin:** They should orchestrate, not implement business logic

### Database Switching Key Points
- Repository interfaces are defined in the **Application Layer** (not Infrastructure)
- Use cases depend on **interfaces**, not concrete implementations
- The Factory pattern decides which implementation to use at runtime
- No `if (DB_TYPE === 'postgres')` should exist in Use Cases or Domain

### Common Pitfalls to Avoid
- ❌ Don't import Express or database drivers in Use Cases
- ❌ Don't put business rules in Controllers or Repositories
- ❌ Don't skip entity validation - it's the core of Clean Architecture
- ❌ Don't use concrete repository classes directly - always use interfaces
- ✅ Do keep layers independent and testable
- ✅ Do validate business rules in entities
- ✅ Do use dependency injection consistently

---

**Total Sub-tasks:** 110+  
**Estimated Time per Phase:**
- Phase 1 (Setup): 2-3 hours
- Phase 2 (Domain): 2 hours
- Phase 3 (Application): 4-5 hours
- Phase 4 (Infrastructure): 5-6 hours
- Phase 5 (Adapters): 3-4 hours
- Phase 6 (Frontend): 6-8 hours
- Phase 7 (Integration): 3-4 hours

**Total Estimated Time:** 25-35 hours for a focused developer


