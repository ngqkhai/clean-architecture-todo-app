# Product Requirements Document: Clean Architecture To-Do List Application

## 1. Introduction/Overview

We are building a monolithic To-Do list web application that serves as an exemplary implementation of **Clean Architecture** and **Domain-Driven Design (DDD)** principles. While the feature set is intentionally simple (task and list management), the true value lies in demonstrating how to build a flexible, maintainable, and database-agnostic system.

**The Problem:** Most to-do applications tightly couple business logic to databases and frameworks, making them difficult to maintain, test, and extend. Developers need a reference implementation that shows how to properly separate concerns.

**The Solution:** A beautiful, modern to-do application where the core business logic is completely independent of external concerns. The system can swap between PostgreSQL and MongoDB without changing a single line of business logic.

**Target Audience:** Developers learning Clean Architecture, hiring managers evaluating architectural skills, and end-users who want a simple, elegant task management tool.

---

## 2. Goals

1. **Demonstrate Clean Architecture Excellence:** Create a reference implementation that strictly follows the Dependency Rule and layer separation.
2. **Prove Database Agnosticism:** Enable seamless switching between SQL (PostgreSQL) and NoSQL (MongoDB) via environment configuration.
3. **Implement Secure Authentication:** Provide robust user authentication and authorization following security best practices.
4. **Deliver Beautiful UX:** Provide a modern, polished, and delightful user interface with smooth transitions and intuitive interactions.
5. **Enable Easy Deployment:** Package the entire application with Docker for one-command startup.
6. **Serve as Educational Material:** Document the architecture so thoroughly that junior developers can understand and replicate the patterns.

---

## 3. User Stories

### End-User Stories

**Authentication:**
- **US-1:** As a new user, I want to register an account with my email and password so that I can start using the application.
- **US-2:** As a registered user, I want to log in with my email and password so that I can access my to-do lists.
- **US-3:** As a logged-in user, I want to log out so that I can secure my account when I'm done.
- **US-4:** As a user, I want my password to be securely hashed so that my account is protected.
- **US-5:** As a logged-in user, I want my session to persist across page refreshes so that I don't have to log in repeatedly.

**ToDoList Management:**
- **US-6:** As a user, I want to create a new to-do list with a title (e.g., "Home Chores," "Work Projects") so that I can organize tasks by category.
- **US-7:** As a user, I want to view only MY to-do lists (not other users' lists) so that my data is private.
- **US-8:** As a user, I want to rename a to-do list so that I can keep my organization up-to-date.
- **US-9:** As a user, I want to delete a to-do list (and all its items) so that I can remove categories I no longer need.

**ToDoItem Management:**
- **US-10:** As a user, I want to add a new task to a specific list with a title and optional description so that I can track what needs to be done.
- **US-11:** As a user, I want to set a start date and deadline for a task so that I can plan my time effectively.
- **US-12:** As a user, I want to view all tasks within a list, seeing their completion status and upcoming deadlines at a glance.
- **US-13:** As a user, I want to edit task details (title, description, dates) so that I can update tasks as plans change.
- **US-14:** As a user, I want to mark tasks as completed or not completed with a single click so that I can track my progress.
- **US-15:** As a user, I want to delete individual tasks so that I can remove completed or irrelevant items.
- **US-16:** As a user, I want to see visual indicators (e.g., colors, icons) for overdue tasks, upcoming deadlines, and completed tasks.

**Authorization:**
- **US-17:** As a user, I should NOT be able to view or modify another user's to-do lists or items.
- **US-18:** As an unauthenticated visitor, I should be redirected to the login page when trying to access the application.

### Developer Stories

- **US-19:** As a developer, I want to switch the database from PostgreSQL to MongoDB by changing one environment variable so that I can adapt to different deployment requirements.
- **US-20:** As a developer, I want to add new use cases without touching the database layer so that I can extend functionality without risk.
- **US-21:** As a developer, I want to test business logic without any database so that tests run fast and are reliable.

---

## 4. Functional Requirements

### 4.1 Authentication & User Domain Requirements

**FR-1:** The system MUST allow new users to register with:
- `id` (UUID, auto-generated)
- `email` (string, required, unique, valid email format)
- `password` (string, required, min 8 characters, will be hashed)
- `name` (string, required, 1-100 characters)
- `createdAt` (timestamp, auto-generated)
- `updatedAt` (timestamp, auto-updated)

**FR-2:** The system MUST validate email uniqueness - attempting to register with an existing email MUST return an error.

**FR-3:** The system MUST hash passwords using bcrypt (or similar) with a minimum of 10 salt rounds before storing them.

**FR-4:** The system MUST NOT store or return plain-text passwords under any circumstance.

**FR-5:** The system MUST allow registered users to log in with their email and password.

**FR-6:** The system MUST verify the password against the stored hash during login.

**FR-7:** Upon successful login, the system MUST return a JWT (JSON Web Token) containing:
- User ID
- Email
- Expiration time (suggest: 24 hours)

**FR-8:** The system MUST sign JWTs with a secure secret key stored in environment variables.

**FR-9:** All protected API endpoints MUST require a valid JWT in the `Authorization` header (format: `Bearer <token>`).

**FR-10:** The system MUST validate JWTs on protected endpoints and reject invalid/expired tokens with a 401 Unauthorized response.

**FR-11:** The system MUST extract the authenticated user's ID from the JWT and use it for authorization checks.

### 4.2 ToDoList Domain Requirements

**FR-12:** The system MUST allow authenticated users to create a new ToDoList with:
- `id` (UUID, auto-generated)
- `userId` (UUID, required, references the authenticated user)
- `title` (string, required, 1-100 characters)
- `createdAt` (timestamp, auto-generated)
- `updatedAt` (timestamp, auto-updated)

**FR-13:** The system MUST automatically set the `userId` to the authenticated user's ID when creating a ToDoList.

**FR-14:** The system MUST display only ToDoLists belonging to the authenticated user, sorted by creation date (newest first).

**FR-15:** The system MUST allow users to update the title of their own ToDoList.

**FR-16:** The system MUST prevent users from updating ToDoLists that belong to other users (return 403 Forbidden).

**FR-17:** The system MUST allow users to delete their own ToDoList. When a ToDoList is deleted, all associated ToDoItems MUST be deleted (cascade delete).

**FR-18:** The system MUST prevent users from deleting ToDoLists that belong to other users (return 403 Forbidden).

**FR-19:** The system MUST validate that a ToDoList title is not empty and does not exceed 100 characters.

### 4.3 ToDoItem Domain Requirements

**FR-20:** The system MUST allow users to create a new ToDoItem with:
- `id` (UUID, auto-generated)
- `listId` (UUID, required, must reference an existing ToDoList owned by the user)
- `title` (string, required, 1-200 characters)
- `description` (string, optional, max 1000 characters)
- `isCompleted` (boolean, default: false)
- `startDate` (datetime, optional)
- `deadlineDate` (datetime, optional)
- `createdAt` (timestamp, auto-generated)
- `updatedAt` (timestamp, auto-updated)

**FR-21:** The system MUST verify that the `listId` belongs to the authenticated user before creating a ToDoItem (return 403 if not).

**FR-22:** The system MUST enforce the business rule: If both `startDate` and `deadlineDate` are provided, `deadlineDate` MUST NOT be before `startDate`.

**FR-23:** The system MUST display all ToDoItems within a specific ToDoList (only if the list belongs to the authenticated user), showing:
- Title
- Completion status (checkbox)
- Deadline (if set)
- Visual indicator for overdue items (deadline passed and not completed)

**FR-24:** The system MUST allow users to update the following fields of their own ToDoItem:
- `title`
- `description`
- `startDate`
- `deadlineDate`

**FR-25:** The system MUST prevent users from updating ToDoItems that belong to other users' lists (return 403 Forbidden).

**FR-26:** The system MUST allow users to toggle the `isCompleted` status of their own ToDoItem.

**FR-27:** The system MUST allow users to delete their own ToDoItem.

**FR-28:** The system MUST prevent users from deleting ToDoItems that belong to other users' lists (return 403 Forbidden).

**FR-29:** The system MUST validate that a ToDoItem title is not empty and does not exceed 200 characters.

**FR-30:** The system MUST display ToDoItems with visual differentiation:
- Overdue tasks (deadline passed, not completed): Red/warning color
- Upcoming tasks (deadline within 48 hours): Yellow/caution color
- Completed tasks: Greyed out or strikethrough
- Normal tasks: Default color

### 4.4 Database Abstraction Requirements

**FR-31:** The system MUST define Repository Interfaces in the Application Layer:
- `IUserRepository` with methods: `create()`, `findByEmail()`, `findById()`, `update()`, `delete()`
- `IToDoListRepository` with methods: `create()`, `findAllByUserId()`, `findById()`, `update()`, `delete()`
- `IToDoItemRepository` with methods: `create()`, `findByListId()`, `findById()`, `update()`, `delete()`

**FR-32:** The system MUST provide TWO concrete implementations for each repository:
- PostgreSQL implementation (using a SQL ORM or query builder)
- MongoDB implementation (using Mongoose or native driver)

**FR-33:** The system MUST select the database implementation at startup based on an environment variable `DB_TYPE` (values: `postgres` or `mongo`).

**FR-34:** The system MUST use a Factory Pattern or Dependency Injection to inject the correct repository implementation into use cases.

**FR-35:** Business logic (Entities and Use Cases) MUST NOT import or depend on any database-specific code.

### 4.5 API Requirements

**FR-36:** The system MUST expose RESTful API endpoints:

**Authentication Endpoints (Public):**
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token
- `POST /api/auth/logout` - Logout (optional, mainly client-side token removal)
- `GET /api/auth/me` - Get current authenticated user info (Protected)

**ToDoList Endpoints (All Protected):**
- `POST /api/lists` - Create a new list
- `GET /api/lists` - Get all lists for authenticated user
- `GET /api/lists/:id` - Get a specific list (if owned by user)
- `PUT /api/lists/:id` - Update a list (if owned by user)
- `DELETE /api/lists/:id` - Delete a list (if owned by user)

**ToDoItem Endpoints (All Protected):**
- `POST /api/lists/:listId/items` - Create a new item in a list (if user owns list)
- `GET /api/lists/:listId/items` - Get all items in a list (if user owns list)
- `GET /api/items/:id` - Get a specific item (if user owns parent list)
- `PUT /api/items/:id` - Update an item (if user owns parent list)
- `PATCH /api/items/:id/complete` - Toggle completion status (if user owns parent list)
- `DELETE /api/items/:id` - Delete an item (if user owns parent list)

**FR-37:** All API responses MUST return appropriate HTTP status codes:
- 200 (OK) for successful GET/PUT/PATCH
- 201 (Created) for successful POST
- 204 (No Content) for successful DELETE
- 400 (Bad Request) for validation errors
- 401 (Unauthorized) for missing/invalid authentication
- 403 (Forbidden) for valid authentication but insufficient permissions
- 404 (Not Found) for non-existent resources
- 409 (Conflict) for duplicate email registration
- 500 (Internal Server Error) for server errors

**FR-38:** All error responses MUST include a JSON body with:
```json
{
  "error": "Error message here",
  "code": "ERROR_CODE"
}
```

**FR-39:** Protected endpoints MUST verify JWT tokens before processing requests.

### 4.6 UI Requirements

**FR-40:** The UI MUST include authentication pages:
- Login page with email and password fields
- Registration page with name, email, and password fields
- Password visibility toggle on both pages

**FR-41:** The UI MUST redirect unauthenticated users to the login page when trying to access protected routes.

**FR-42:** The UI MUST store the JWT token securely (localStorage or httpOnly cookie) and include it in all API requests.

**FR-43:** The UI MUST display user information (name/email) in a header/navigation bar when logged in.

**FR-44:** The UI MUST provide a logout button that clears the token and redirects to login.

**FR-45:** The UI MUST be responsive and work on desktop, tablet, and mobile devices.

**FR-46:** The UI MUST have a modern, minimalist design with:
- Clean typography
- Ample whitespace
- Subtle shadows and rounded corners
- A pleasant color palette (suggest: soft blues/grays with accent colors)

**FR-47:** The UI MUST include smooth animations:
- List/item creation: fade-in animation
- List/item deletion: fade-out animation
- Checkbox toggle: smooth transition
- Page transitions: gentle slide or fade
- Login/registration form transitions

**FR-48:** The UI MUST display:
- A main view showing all ToDoLists as cards or tiles (after authentication)
- A detail view showing all ToDoItems when a list is selected
- Inline editing capabilities (click to edit)
- Modal or slide-in panel for creating new items

**FR-49:** The UI MUST provide immediate visual feedback:
- Loading states during API calls
- Success/error toasts or notifications
- Disabled states for buttons during submission
- Form validation errors (email format, password length, etc.)

---

## 5. Non-Goals (Out of Scope)

**NG-1:** Real-time collaboration or WebSocket features.

**NG-2:** Task sharing or social features between users.

**NG-3:** Email or push notifications for deadlines.

**NG-4:** Password reset/forgot password functionality (keep it simple for now).

**NG-5:** Social login (Google, Facebook, etc.) - only email/password authentication.

**NG-6:** Advanced features like recurring tasks, subtasks, tags, or priorities.

**NG-7:** Mobile native applications (web-only).

**NG-8:** Third-party integrations (Google Calendar, Slack, etc.).

**NG-9:** Advanced search or filtering beyond basic display.

**NG-10:** Data export/import functionality.

**NG-11:** Internationalization (English-only for now).

---

## 6. Design Considerations

### 6.1 UI/UX Design

**Color Palette Suggestion:**
- Primary: `#4F46E5` (Indigo) - for CTAs and accents
- Background: `#F9FAFB` (Light Gray) - for main background
- Cards: `#FFFFFF` (White) - for list/item cards
- Text: `#111827` (Dark Gray) - for primary text
- Muted: `#6B7280` (Medium Gray) - for secondary text
- Success: `#10B981` (Green) - for completed items
- Warning: `#F59E0B` (Amber) - for upcoming deadlines
- Danger: `#EF4444` (Red) - for overdue items

**Typography:**
- Font: Inter, SF Pro, or Segoe UI
- Headings: 600 weight
- Body: 400 weight
- Line height: 1.6 for readability

**Component Library:**
- Use a headless UI library (e.g., Headless UI, Radix UI) for accessibility
- Custom styling with Tailwind CSS for rapid development

**Layout:**
```
┌─────────────────────────────────────────────┐
│  Header: "My To-Do Lists"    [+ New List]  │
├─────────────────────────────────────────────┤
│  ┌───────────┐  ┌───────────┐  ┌─────────┐ │
│  │ List 1    │  │ List 2    │  │ List 3  │ │
│  │ (5 items) │  │ (2 items) │  │ (0 items)│ │
│  └───────────┘  └───────────┘  └─────────┘ │
│                                             │
│  When a list is clicked:                   │
│  ┌─────────────────────────────────────┐   │
│  │ ← Back    List 1         [+ Item]  │   │
│  ├─────────────────────────────────────┤   │
│  │ □ Task 1 (Due: Tomorrow) 🟡        │   │
│  │ ☑ Task 2 (Completed) ───────       │   │
│  │ □ Task 3 (Overdue!) 🔴             │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

**Animations:**
- Page transitions: 200-300ms ease-in-out
- Checkbox toggle: Scale effect (1.0 → 1.1 → 1.0)
- Item creation: Slide-in from top with fade
- Item deletion: Slide-out with fade

### 6.2 Accessibility

- All interactive elements MUST be keyboard accessible
- Proper ARIA labels for screen readers
- Focus indicators on all interactive elements
- Color contrast ratio MUST meet WCAG AA standards (4.5:1 for normal text)

---

## 7. Technical Considerations

### 7.1 Architecture

**Layer Structure:**
```
src/
├── domain/                    # Layer 1: Entities (Core Business Logic)
│   ├── entities/
│   │   ├── User.ts
│   │   ├── ToDoList.ts
│   │   └── ToDoItem.ts
│   └── value-objects/
│       ├── Email.ts           # Email validation
│       ├── Password.ts        # Password validation
│       └── DateRange.ts       # Encapsulates start/deadline validation
│
├── application/               # Layer 2: Use Cases
│   ├── use-cases/
│   │   ├── auth/
│   │   │   ├── RegisterUser.ts
│   │   │   ├── LoginUser.ts
│   │   │   └── GetCurrentUser.ts
│   │   ├── todo-list/
│   │   │   ├── CreateToDoList.ts
│   │   │   ├── GetAllToDoListsByUser.ts
│   │   │   ├── GetToDoListById.ts
│   │   │   ├── UpdateToDoList.ts
│   │   │   └── DeleteToDoList.ts
│   │   └── todo-item/
│   │       ├── CreateToDoItem.ts
│   │       ├── GetItemsByList.ts
│   │       ├── UpdateToDoItem.ts
│   │       ├── ToggleItemCompletion.ts
│   │       └── DeleteToDoItem.ts
│   ├── repositories/          # Repository Interfaces
│   │   ├── IUserRepository.ts
│   │   ├── IToDoListRepository.ts
│   │   └── IToDoItemRepository.ts
│   └── services/              # Application Services
│       ├── IPasswordHasher.ts
│       └── ITokenService.ts
│
├── infrastructure/            # Layer 3: Frameworks & Drivers
│   ├── security/
│   │   ├── BcryptPasswordHasher.ts
│   │   └── JwtTokenService.ts
│   ├── database/
│   │   ├── postgres/
│   │   │   ├── PostgresUserRepository.ts
│   │   │   ├── PostgresToDoListRepository.ts
│   │   │   ├── PostgresToDoItemRepository.ts
│   │   │   └── migrations/
│   │   │       └── 001_initial_schema.sql
│   │   ├── mongodb/
│   │   │   ├── MongoUserRepository.ts
│   │   │   ├── MongoToDoListRepository.ts
│   │   │   ├── MongoToDoItemRepository.ts
│   │   │   └── schemas/
│   │   │       ├── UserSchema.ts
│   │   │       ├── ToDoListSchema.ts
│   │   │       └── ToDoItemSchema.ts
│   │   └── factory/
│   │       └── RepositoryFactory.ts   # Selects implementation based on DB_TYPE
│   └── web/
│       ├── express/           # Express app setup
│       │   └── app.ts
│       ├── controllers/
│       │   ├── AuthController.ts
│       │   ├── ToDoListController.ts
│       │   └── ToDoItemController.ts
│       └── middleware/
│           ├── authenticate.ts    # JWT verification
│           ├── authorize.ts       # Ownership verification
│           ├── errorHandler.ts
│           └── validator.ts
│
└── presentation/              # Layer 3: UI (could be separate repo)
    └── (This is the React app - separate folder structure below)
```

**Frontend Structure:**
```
frontend/
├── src/
│   ├── domain/                # Optional: Frontend domain models (DTOs)
│   │   ├── User.ts
│   │   ├── ToDoList.ts
│   │   └── ToDoItem.ts
│   ├── application/           # Business logic for UI
│   │   ├── context/
│   │   │   └── AuthContext.tsx   # Auth state management
│   │   └── hooks/
│   │       ├── useAuth.ts
│   │       ├── useToDoLists.ts
│   │       └── useToDoItems.ts
│   ├── infrastructure/        # API clients
│   │   ├── api/
│   │   │   ├── apiClient.ts      # Axios instance with auth interceptor
│   │   │   ├── authApi.ts
│   │   │   ├── toDoListApi.ts
│   │   │   └── toDoItemApi.ts
│   │   └── auth/
│   │       └── tokenStorage.ts   # LocalStorage token management
│   ├── presentation/          # UI Components
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   └── ProtectedRoute.tsx
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   └── Navbar.tsx
│   │   │   ├── ToDoListCard.tsx
│   │   │   ├── ToDoItemRow.tsx
│   │   │   ├── CreateListModal.tsx
│   │   │   └── CreateItemModal.tsx
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── ListsOverview.tsx
│   │   │   └── ListDetail.tsx
│   │   └── layouts/
│   │       ├── AuthLayout.tsx
│   │       └── MainLayout.tsx
│   └── App.tsx
```

### 7.2 Technology Stack

**Backend:**
- **Runtime:** Node.js 20+ with TypeScript 5+
- **Framework:** Express.js (lightweight, minimal) - chosen over NestJS for simplicity in demonstrating Clean Architecture manually
- **Authentication:** 
  - `jsonwebtoken` for JWT generation/verification
  - `bcrypt` for password hashing
- **SQL Database:** PostgreSQL 15+
- **SQL Client:** `pg` with a lightweight query builder OR TypeORM (configured as a plugin, not framework)
- **NoSQL Database:** MongoDB 7+
- **NoSQL Client:** Mongoose OR native MongoDB driver
- **Validation:** Zod or class-validator for request validation
- **Environment:** dotenv for configuration
- **Testing (Minimal):** Jest for core domain/use case unit tests

**Frontend:**
- **Framework:** React 18+ with TypeScript
- **Build Tool:** Vite (fast, modern)
- **Styling:** Tailwind CSS
- **Component Library:** Radix UI or Headless UI (for accessibility)
- **HTTP Client:** Axios or Fetch API
- **State Management:** React Query (for server state) + Context API or Zustand (for UI state)
- **Routing:** React Router v6
- **Animations:** Framer Motion

**DevOps:**
- **Containerization:** Docker & Docker Compose
- **Database Migration:** Custom SQL scripts for Postgres, Mongoose for MongoDB schema

### 7.3 Database Schemas

**PostgreSQL Schema:**
```sql
-- migrations/001_initial_schema.sql

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);

-- ToDoLists table
CREATE TABLE todo_lists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_todo_lists_user_id ON todo_lists(user_id);

-- ToDoItems table
CREATE TABLE todo_items (
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

CREATE INDEX idx_todo_items_list_id ON todo_items(list_id);
CREATE INDEX idx_todo_items_deadline ON todo_items(deadline_date);
```

**MongoDB Document Structure:**
```javascript
// User Collection
{
  _id: ObjectId("..."),
  id: "uuid-string",  // For consistency with Postgres
  email: "user@example.com",
  passwordHash: "$2b$10$...",  // Bcrypt hash
  name: "John Doe",
  createdAt: ISODate("2025-10-23T10:00:00Z"),
  updatedAt: ISODate("2025-10-23T10:00:00Z")
}

// ToDoList Collection
{
  _id: ObjectId("..."),
  id: "uuid-string",
  userId: "uuid-string-of-owner",
  title: "Home Chores",
  createdAt: ISODate("2025-10-23T10:00:00Z"),
  updatedAt: ISODate("2025-10-23T10:00:00Z")
}

// ToDoItem Collection
{
  _id: ObjectId("..."),
  id: "uuid-string",
  listId: "uuid-string-of-parent-list",
  title: "Buy groceries",
  description: "Milk, bread, eggs",
  isCompleted: false,
  startDate: ISODate("2025-10-24T09:00:00Z"),
  deadlineDate: ISODate("2025-10-26T18:00:00Z"),
  createdAt: ISODate("2025-10-23T11:00:00Z"),
  updatedAt: ISODate("2025-10-23T11:00:00Z")
}
```

### 7.4 Repository Factory Pattern

**RepositoryFactory.ts:**
```typescript
// infrastructure/database/factory/RepositoryFactory.ts

import { IUserRepository } from '../../../application/repositories/IUserRepository';
import { IToDoListRepository } from '../../../application/repositories/IToDoListRepository';
import { IToDoItemRepository } from '../../../application/repositories/IToDoItemRepository';
import { PostgresUserRepository } from '../postgres/PostgresUserRepository';
import { PostgresToDoListRepository } from '../postgres/PostgresToDoListRepository';
import { PostgresToDoItemRepository } from '../postgres/PostgresToDoItemRepository';
import { MongoUserRepository } from '../mongodb/MongoUserRepository';
import { MongoToDoListRepository } from '../mongodb/MongoToDoListRepository';
import { MongoToDoItemRepository } from '../mongodb/MongoToDoItemRepository';

export class RepositoryFactory {
  static createUserRepository(): IUserRepository {
    const dbType = process.env.DB_TYPE || 'postgres';
    
    switch (dbType) {
      case 'postgres':
        return new PostgresUserRepository();
      case 'mongo':
        return new MongoUserRepository();
      default:
        throw new Error(`Unsupported database type: ${dbType}`);
    }
  }

  static createToDoListRepository(): IToDoListRepository {
    const dbType = process.env.DB_TYPE || 'postgres';
    
    switch (dbType) {
      case 'postgres':
        return new PostgresToDoListRepository();
      case 'mongo':
        return new MongoToDoListRepository();
      default:
        throw new Error(`Unsupported database type: ${dbType}`);
    }
  }

  static createToDoItemRepository(): IToDoItemRepository {
    const dbType = process.env.DB_TYPE || 'postgres';
    
    switch (dbType) {
      case 'postgres':
        return new PostgresToDoItemRepository();
      case 'mongo':
        return new MongoToDoItemRepository();
      default:
        throw new Error(`Unsupported database type: ${dbType}`);
    }
  }
}
```

**Controllers use the factory:**
```typescript
// infrastructure/web/controllers/ToDoListController.ts
import { RepositoryFactory } from '../../database/factory/RepositoryFactory';
import { CreateToDoList } from '../../../application/use-cases/todo-list/CreateToDoList';

export class ToDoListController {
  async create(req, res) {
    const repository = RepositoryFactory.createToDoListRepository();
    const useCase = new CreateToDoList(repository);
    const result = await useCase.execute(req.body);
    res.status(201).json(result);
  }
}
```

### 7.5 Environment Variables

```env
# .env file

# Database Configuration
DB_TYPE=postgres           # Options: postgres | mongo

# PostgreSQL Configuration
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=todo_db
POSTGRES_USER=todo_user
POSTGRES_PASSWORD=todo_password

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/todo_db

# Authentication Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRATION=24h         # Token expiration time

# Security
BCRYPT_SALT_ROUNDS=10

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 7.6 Docker Configuration

**Dockerfile (Backend):**
```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: todo_db
      POSTGRES_USER: todo_user
      POSTGRES_PASSWORD: todo_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backend/infrastructure/database/postgres/migrations:/docker-entrypoint-initdb.d
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U todo_user"]
      interval: 5s
      timeout: 5s
      retries: 5

  # MongoDB Database
  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
    healthcheck:
      test: ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"]
      interval: 5s
      timeout: 5s
      retries: 5

  # Backend API
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - DB_TYPE=${DB_TYPE:-postgres}
      - POSTGRES_HOST=postgres
      - POSTGRES_PORT=5432
      - POSTGRES_DB=todo_db
      - POSTGRES_USER=todo_user
      - POSTGRES_PASSWORD=todo_password
      - MONGO_URI=mongodb://mongo:27017/todo_db
      - NODE_ENV=production
    depends_on:
      postgres:
        condition: service_healthy
      mongo:
        condition: service_healthy

  # Frontend
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "5173:5173"
    environment:
      - VITE_API_URL=http://localhost:3000/api
    depends_on:
      - backend

volumes:
  postgres_data:
  mongo_data:
```

### 7.7 Seed Data

**Seed Script (seeds/seed-data.ts):**
```typescript
// Seeds identical data for both databases

export const seedUsers = [
  {
    id: "user-1-uuid",
    email: "john@example.com",
    passwordHash: "$2b$10$YourHashedPasswordHere1",  // Password: "password123"
    name: "John Doe",
    createdAt: new Date("2025-10-19T10:00:00Z"),
    updatedAt: new Date("2025-10-19T10:00:00Z")
  },
  {
    id: "user-2-uuid",
    email: "jane@example.com",
    passwordHash: "$2b$10$YourHashedPasswordHere2",  // Password: "password123"
    name: "Jane Smith",
    createdAt: new Date("2025-10-19T11:00:00Z"),
    updatedAt: new Date("2025-10-19T11:00:00Z")
  }
];

export const seedLists = [
  // John's lists
  {
    id: "list-1-uuid",
    userId: "user-1-uuid",
    title: "Personal Projects",
    createdAt: new Date("2025-10-20T10:00:00Z"),
    updatedAt: new Date("2025-10-20T10:00:00Z")
  },
  {
    id: "list-2-uuid",
    userId: "user-1-uuid",
    title: "Home Chores",
    createdAt: new Date("2025-10-21T14:00:00Z"),
    updatedAt: new Date("2025-10-21T14:00:00Z")
  },
  // Jane's list
  {
    id: "list-3-uuid",
    userId: "user-2-uuid",
    title: "Learning Goals",
    createdAt: new Date("2025-10-22T09:00:00Z"),
    updatedAt: new Date("2025-10-22T09:00:00Z")
  }
];

export const seedItems = [
  // Personal Projects items
  {
    id: "item-1-uuid",
    listId: "list-1-uuid",
    title: "Build Clean Architecture To-Do App",
    description: "Learn and implement Clean Architecture principles",
    isCompleted: false,
    startDate: new Date("2025-10-23T00:00:00Z"),
    deadlineDate: new Date("2025-10-30T23:59:59Z"),
    createdAt: new Date("2025-10-20T10:05:00Z"),
    updatedAt: new Date("2025-10-20T10:05:00Z")
  },
  {
    id: "item-2-uuid",
    listId: "list-1-uuid",
    title: "Deploy to Docker",
    description: "Create docker-compose setup for easy deployment",
    isCompleted: false,
    startDate: null,
    deadlineDate: new Date("2025-10-25T18:00:00Z"),
    createdAt: new Date("2025-10-20T10:10:00Z"),
    updatedAt: new Date("2025-10-20T10:10:00Z")
  },
  // Home Chores items
  {
    id: "item-3-uuid",
    listId: "list-2-uuid",
    title: "Buy groceries",
    description: "Milk, bread, eggs, vegetables",
    isCompleted: true,
    startDate: null,
    deadlineDate: new Date("2025-10-22T20:00:00Z"),
    createdAt: new Date("2025-10-21T14:05:00Z"),
    updatedAt: new Date("2025-10-22T19:30:00Z")
  },
  {
    id: "item-4-uuid",
    listId: "list-2-uuid",
    title: "Clean the garage",
    description: null,
    isCompleted: false,
    startDate: new Date("2025-10-24T10:00:00Z"),
    deadlineDate: new Date("2025-10-27T18:00:00Z"),
    createdAt: new Date("2025-10-21T14:10:00Z"),
    updatedAt: new Date("2025-10-21T14:10:00Z")
  },
  // Learning Goals items
  {
    id: "item-5-uuid",
    listId: "list-3-uuid",
    title: "Master TypeScript generics",
    description: "Study advanced TypeScript patterns",
    isCompleted: false,
    startDate: new Date("2025-10-23T00:00:00Z"),
    deadlineDate: new Date("2025-11-01T23:59:59Z"),
    createdAt: new Date("2025-10-22T09:05:00Z"),
    updatedAt: new Date("2025-10-22T09:05:00Z")
  },
  {
    id: "item-6-uuid",
    listId: "list-3-uuid",
    title: "Read 'Clean Architecture' book",
    description: "By Robert C. Martin (Uncle Bob)",
    isCompleted: false,
    startDate: null,
    deadlineDate: null,
    createdAt: new Date("2025-10-22T09:10:00Z"),
    updatedAt: new Date("2025-10-22T09:10:00Z")
  }
];
```

---

## 8. Success Metrics

Since this is an academic/portfolio project, success is measured by:

**SM-1:** **Architectural Purity** - Zero dependencies from Use Cases to Infrastructure (verified via dependency analysis tools like `dependency-cruiser`).

**SM-2:** **Database Swappability** - Successful demonstration of switching between PostgreSQL and MongoDB by changing one environment variable, with all tests passing for both configurations.

**SM-3:** **Code Quality** - TypeScript strict mode enabled with zero `any` types in core business logic.

**SM-4:** **Documentation Quality** - Every layer, use case, and repository has clear documentation explaining the "why" behind architectural decisions.

**SM-5:** **UI Polish** - Modern, responsive interface with smooth animations that demonstrates professional frontend skills.

**SM-6:** **Portfolio Impact** - Project clearly demonstrates understanding of Clean Architecture to potential employers or as teaching material.

---

## 9. Open Questions

**OQ-1:** Should we implement a simple in-memory repository implementation as well (for testing purposes)? This would demonstrate the Repository pattern even more clearly.

**OQ-2:** Do we want to include a simple API documentation tool (like Swagger/OpenAPI) to make the backend more presentable?

**OQ-3:** Should the frontend and backend be in the same monorepo or separate repositories? (Recommendation: same repo with `/backend` and `/frontend` folders for simplicity)

**OQ-4:** Do we want to include basic error logging (e.g., Winston or Pino) in the infrastructure layer?

**OQ-5:** Should we implement optimistic UI updates in the frontend for a snappier user experience?

**OQ-6:** Do we want to add a simple "About" or "Architecture" page in the frontend that explains the Clean Architecture layers visually? (Great for portfolio presentation)

**OQ-7:** Should we implement sorting/filtering for to-do items (e.g., sort by deadline, filter by completion status)? This could demonstrate how to add features without touching core logic.

**OQ-8:** Do we need a "Getting Started" guide or tutorial as part of the project documentation?

---

## 10. Next Steps

1. **Review & Approve:** Stakeholder (you) reviews this PRD and provides feedback.
2. **Setup Project Structure:** Create the folder structure for backend and frontend.
3. **Implement Domain Layer:** Start with pure business logic (User, ToDoList, ToDoItem entities, and Value Objects).
4. **Implement Authentication Use Cases:** Build RegisterUser, LoginUser use cases with repository interfaces.
5. **Implement Infrastructure - Security:** Create BcryptPasswordHasher and JwtTokenService.
6. **Implement Infrastructure - Database:** Create both PostgreSQL and MongoDB implementations for all three repositories (User, ToDoList, ToDoItem).
7. **Implement Repository Factory:** Set up the factory pattern for database selection.
8. **Build API Layer - Auth:** Set up Express authentication endpoints and JWT middleware.
9. **Implement ToDoList/Item Use Cases:** Build the remaining use cases with authorization checks.
10. **Build API Layer - Protected Routes:** Set up protected controllers for lists and items.
11. **Build Frontend - Auth:** Create Login/Register pages and AuthContext.
12. **Build Frontend - Main App:** Create ToDoList and ToDoItem components with protected routes.
13. **Docker Setup:** Create Dockerfile and docker-compose.yml for all services.
14. **Testing:** Add minimal tests for domain, use cases, and authentication flow.
15. **Seed Data:** Create seed scripts for both databases with sample users and data.
16. **Documentation:** Write comprehensive README and architectural documentation.
17. **Polish:** Add animations, improve UI, final security audit, final touches.

---

**Document Version:** 2.0  
**Created:** October 23, 2025  
**Last Updated:** October 23, 2025  
**Author:** AI Assistant (based on user requirements)  
**Status:** Updated - Authentication & Authorization Added  
**Change Log:**
- v2.0: Added comprehensive authentication and authorization features (JWT, bcrypt, multi-user support)
- v1.0: Initial draft

