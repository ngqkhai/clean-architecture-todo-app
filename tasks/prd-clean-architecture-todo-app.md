# Product Requirements Document: Clean Architecture To-Do List Application

## 1. Introduction/Overview

We are building a monolithic To-Do list web application that serves as a **demonstration of Clean Architecture and Domain-Driven Design (DDD) principles**. This is not just a feature-complete to-do app—it's an educational and portfolio project showcasing how to build maintainable, testable, and flexible software.

### The Problem
- **For End Users:** Users need a simple, beautiful way to organize tasks across multiple lists, with key dates and deadlines.
- **For Developers:** Traditional to-do apps tightly couple business logic to databases and frameworks, making them hard to test, maintain, and evolve. This project demonstrates a better way.

### The Solution
A web application built with strict adherence to Clean Architecture, where:
- Core business logic is completely independent of databases, frameworks, and UI
- The database can be swapped (SQL ↔ NoSQL) without touching business logic
- Each architectural layer has clear boundaries and dependencies flow inward

---

## 2. Goals

1. **Demonstrate Clean Architecture:** Implement a real-world application with clear separation between Entities, Use Cases, Interface Adapters, and Frameworks & Drivers.
2. **Database Independence:** Enable switching between PostgreSQL and MongoDB at runtime using environment variables, without modifying core business logic.
3. **User-Friendly Interface:** Provide a minimalist, intuitive, and beautiful UI that makes task management effortless.
4. **Secure Authentication:** Implement user registration, login, and authorization so each user sees only their own data.
5. **Portfolio-Ready:** Create a project that demonstrates software architecture skills to potential employers or educators.

---

## 3. User Stories

### Authentication Domain
- **US-1:** As a new user, I want to register an account with email and password so that I can access the application.
- **US-2:** As a registered user, I want to log in with my email and password so that I can access my to-do lists.
- **US-3:** As a logged-in user, I want to log out so that I can secure my session.
- **US-4:** As a user, I want my password to be securely hashed so that my credentials are protected.

### ToDoList Domain
- **US-5:** As a logged-in user, I want to create a new "ToDoList" with a title (e.g., "Home Chores," "Project X") so that I can organize tasks by category.
- **US-6:** As a logged-in user, I want to see all my "ToDoLists" in an overview so that I can choose which one to work on.
- **US-7:** As a logged-in user, I want to rename a "ToDoList" so that I can update its purpose.
- **US-8:** As a logged-in user, I want to delete a "ToDoList" (and all tasks within it) so that I can remove completed or obsolete categories.

### ToDoItem Domain
- **US-9:** As a logged-in user, I want to add a new "ToDoItem" to a specific "ToDoList" so that I can track individual tasks.
- **US-10:** As a logged-in user, I want to see all "ToDoItems" within a "ToDoList" so that I can review what needs to be done.
- **US-11:** As a logged-in user, I want to edit the title, description, start date, and deadline of a "ToDoItem" so that I can keep information up-to-date.
- **US-12:** As a logged-in user, I want to mark a "ToDoItem" as completed or not completed so that I can track my progress.
- **US-13:** As a logged-in user, I want to delete a "ToDoItem" so that I can remove tasks I no longer need.

---

## 4. Functional Requirements

### 4.1 Authentication & Authorization

**FR-1:** The system must allow new users to register with:
- Email (unique, validated format)
- Password (minimum 8 characters)

**FR-2:** The system must hash passwords using a secure algorithm (e.g., bcrypt) before storing them.

**FR-3:** The system must allow registered users to log in with email and password.

**FR-4:** The system must return a JWT (JSON Web Token) upon successful login, which the frontend will use for subsequent requests.

**FR-5:** The system must validate the JWT on protected routes and reject unauthorized requests with HTTP 401.

**FR-6:** The system must associate each ToDoList and ToDoItem with a `userId` to ensure users can only access their own data.

**FR-7:** The system must allow users to log out (frontend clears the JWT).

### 4.2 ToDoList Management

**FR-8:** The system must allow authenticated users to create a ToDoList with:
- `id` (UUID, auto-generated)
- `title` (string, required, max 100 characters)
- `userId` (foreign key to User)
- `createdAt` (timestamp, auto-generated)
- `updatedAt` (timestamp, auto-generated)

**FR-9:** The system must return all ToDoLists belonging to the authenticated user (filtered by `userId`).

**FR-10:** The system must allow users to update the `title` of their own ToDoList.

**FR-11:** The system must allow users to delete their own ToDoList. Deleting a list must also delete all associated ToDoItems (cascade delete).

**FR-12:** The system must prevent users from accessing, modifying, or deleting ToDoLists that do not belong to them (authorization check).

### 4.3 ToDoItem Management

**FR-13:** The system must allow authenticated users to create a ToDoItem with:
- `id` (UUID, auto-generated)
- `title` (string, required, max 200 characters)
- `description` (string, optional, max 1000 characters)
- `isCompleted` (boolean, default `false`)
- `listId` (foreign key to ToDoList, required)
- `userId` (foreign key to User, for authorization)
- `startDate` (datetime, optional)
- `deadlineDate` (datetime, optional)
- `createdAt` (timestamp, auto-generated)
- `updatedAt` (timestamp, auto-generated)

**FR-14:** The system must validate that `deadlineDate` is not before `startDate` (business rule enforced in the Entity layer).

**FR-15:** The system must return all ToDoItems for a given ToDoList, ensuring the list belongs to the authenticated user.

**FR-16:** The system must allow users to update a ToDoItem's `title`, `description`, `startDate`, and `deadlineDate`.

**FR-17:** The system must allow users to toggle the `isCompleted` status of a ToDoItem.

**FR-18:** The system must allow users to delete a ToDoItem that belongs to one of their lists.

**FR-19:** The system must prevent users from creating, modifying, or deleting ToDoItems in lists that do not belong to them.

### 4.4 Database Abstraction

**FR-20:** The system must define repository interfaces (e.g., `IUserRepository`, `IToDoListRepository`, `IToDoItemRepository`) in the Use Cases layer.

**FR-21:** The system must provide two concrete implementations for each repository:
- PostgreSQL implementation (using `pg` or `node-postgres`)
- MongoDB implementation (using `mongodb` driver or Mongoose)

**FR-22:** The system must select the active database at startup based on the `DB_TYPE` environment variable (`postgres` or `mongo`).

**FR-23:** The system must use a Factory pattern or Dependency Injection to inject the correct repository implementation into Use Cases.

### 4.5 User Interface

**FR-24:** The UI must have a **Login Page** with email and password fields, and a "Register" link.

**FR-25:** The UI must have a **Register Page** with email, password, and confirm password fields.

**FR-26:** The UI must have a **Lists Overview Page** that displays all the user's ToDoLists as cards, with a button to create a new list.

**FR-27:** The UI must have a **List Detail Page** that shows all ToDoItems in a selected list, with options to add, edit, complete, and delete items.

**FR-28:** The UI must display dates (start date, deadline) in a user-friendly format.

**FR-29:** The UI must use the specified color palette:
- **Background:** `#F9F7F7` (Warm Off-White)
- **Secondary Background/Cards:** `#DBE2EF` (Light Muted Blue)
- **Primary Accent (Buttons/Links):** `#3F72AF` (Strong Blue)
- **Primary Text:** `#112D4E` (Dark Navy)

**FR-30:** The UI must be responsive and work on desktop and mobile devices.

---

## 5. Non-Goals (Out of Scope)

1. **Multi-tenancy or Team Collaboration:** Users cannot share lists or items with others.
2. **Real-time Sync:** No WebSockets or real-time updates (simple HTTP requests only).
3. **Advanced Features:** No tags, priorities, subtasks, recurring tasks, or notifications.
4. **Email Verification:** Registration does not require email confirmation.
5. **Password Reset:** No "forgot password" functionality.
6. **OAuth/Social Login:** Only email/password authentication.
7. **Production Deployment:** No CI/CD pipelines or cloud deployment setup (local Docker only).
8. **Advanced Security:** No rate limiting, CSRF protection, or 2FA (basic JWT auth only).

---

## 6. Design Considerations

### 6.1 UI/UX Requirements

- **Minimalist Design:** Clean, spacious layouts with ample whitespace.
- **Consistency:** Use the provided color palette throughout.
- **Accessibility:** Ensure good contrast ratios for text readability.
- **Responsive:** Mobile-first approach using CSS Flexbox/Grid or a lightweight CSS framework (e.g., Tailwind CSS).

### 6.2 Frontend Components (React + TypeScript)

Suggested component structure:
- `LoginForm.tsx` - Login form with email/password inputs
- `RegisterForm.tsx` - Registration form
- `Header.tsx` - Navigation bar with app title and logout button
- `ToDoListCard.tsx` - Card displaying a single list
- `ListsOverview.tsx` - Page showing all lists
- `ToDoItemRow.tsx` - Single to-do item with checkbox, title, dates, and actions
- `ListDetail.tsx` - Page showing items in a selected list
- `CreateListModal.tsx` - Modal for creating/editing a list
- `CreateItemModal.tsx` - Modal for creating/editing an item

---

## 7. Technical Considerations

### 7.1 Technology Stack

**Backend:**
- **Language:** Node.js with JavaScript (ES6+)
- **Framework:** Express.js
- **Authentication:** JWT (jsonwebtoken library), bcrypt for password hashing
- **SQL Database:** PostgreSQL with `pg` (node-postgres) driver
- **NoSQL Database:** MongoDB with `mongodb` driver (or Mongoose)
- **Testing:** Minimal (focus on architecture, not extensive tests)

**Frontend:**
- **Framework:** React with TypeScript
- **Styling:** Tailwind CSS or CSS Modules (your choice)
- **HTTP Client:** Axios or Fetch API
- **State Management:** React Context API or simple local state (no Redux needed)

**DevOps:**
- **Containerization:** Docker & Docker Compose
- **Databases:** PostgreSQL container, MongoDB container

### 7.2 Clean Architecture Folder Structure

```
to-do/
├── backend/
│   ├── src/
│   │   ├── domain/                    # Layer 1: Entities (Core Business Logic)
│   │   │   ├── entities/
│   │   │   │   ├── User.js
│   │   │   │   ├── ToDoList.js
│   │   │   │   └── ToDoItem.js
│   │   │   └── errors/
│   │   │       └── DomainError.js
│   │   │
│   │   ├── application/               # Layer 2: Use Cases
│   │   │   ├── use-cases/
│   │   │   │   ├── auth/
│   │   │   │   │   ├── RegisterUser.js
│   │   │   │   │   └── LoginUser.js
│   │   │   │   ├── lists/
│   │   │   │   │   ├── CreateToDoList.js
│   │   │   │   │   ├── GetAllLists.js
│   │   │   │   │   ├── UpdateToDoList.js
│   │   │   │   │   └── DeleteToDoList.js
│   │   │   │   └── items/
│   │   │   │       ├── CreateToDoItem.js
│   │   │   │       ├── GetItemsForList.js
│   │   │   │       ├── UpdateToDoItem.js
│   │   │   │       ├── ToggleItemCompletion.js
│   │   │   │       └── DeleteToDoItem.js
│   │   │   └── interfaces/            # Repository Interfaces (Ports)
│   │   │       ├── IUserRepository.js
│   │   │       ├── IToDoListRepository.js
│   │   │       └── IToDoItemRepository.js
│   │   │
│   │   ├── adapters/                  # Layer 3: Interface Adapters
│   │   │   ├── controllers/
│   │   │   │   ├── AuthController.js
│   │   │   │   ├── ToDoListController.js
│   │   │   │   └── ToDoItemController.js
│   │   │   ├── middlewares/
│   │   │   │   └── authMiddleware.js
│   │   │   └── presenters/
│   │   │       └── ResponseFormatter.js
│   │   │
│   │   ├── infrastructure/            # Layer 4: Frameworks & Drivers
│   │   │   ├── database/
│   │   │   │   ├── postgres/
│   │   │   │   │   ├── PostgresUserRepository.js
│   │   │   │   │   ├── PostgresToDoListRepository.js
│   │   │   │   │   ├── PostgresToDoItemRepository.js
│   │   │   │   │   └── connection.js
│   │   │   │   └── mongo/
│   │   │   │       ├── MongoUserRepository.js
│   │   │   │       ├── MongoToDoListRepository.js
│   │   │   │       ├── MongoToDoItemRepository.js
│   │   │   │       └── connection.js
│   │   │   ├── factories/
│   │   │   │   └── RepositoryFactory.js  # Selects DB based on env var
│   │   │   └── web/
│   │   │       ├── routes/
│   │   │       │   ├── authRoutes.js
│   │   │       │   ├── listRoutes.js
│   │   │       │   └── itemRoutes.js
│   │   │       └── server.js
│   │   │
│   │   └── config/
│   │       └── config.js              # Environment variables
│   │
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/                  # API calls
│   │   ├── hooks/
│   │   ├── context/                   # Auth context
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   ├── Dockerfile
│   └── tsconfig.json
│
├── database/
│   ├── postgres/
│   │   ├── schema.sql                 # CREATE TABLE statements
│   │   └── seed.sql                   # Sample data
│   └── mongo/
│       ├── schema.md                  # Document structure
│       └── seed.json                  # Sample data
│
├── docker-compose.yml
└── README.md
```

### 7.3 Database Schemas

#### PostgreSQL Schema

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE todo_lists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(100) NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE todo_items (
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
    CONSTRAINT valid_dates CHECK (deadline_date IS NULL OR start_date IS NULL OR deadline_date >= start_date)
);

CREATE INDEX idx_todo_lists_user_id ON todo_lists(user_id);
CREATE INDEX idx_todo_items_list_id ON todo_items(list_id);
CREATE INDEX idx_todo_items_user_id ON todo_items(user_id);
```

#### MongoDB Schema (Document Structure)

```json
// users collection
{
  "_id": "ObjectId",
  "email": "string (unique)",
  "passwordHash": "string",
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}

// todoLists collection
{
  "_id": "ObjectId",
  "title": "string",
  "userId": "ObjectId (ref: users)",
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}

// todoItems collection
{
  "_id": "ObjectId",
  "title": "string",
  "description": "string (optional)",
  "isCompleted": "boolean",
  "listId": "ObjectId (ref: todoLists)",
  "userId": "ObjectId (ref: users)",
  "startDate": "ISODate (optional)",
  "deadlineDate": "ISODate (optional)",
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

### 7.4 Database Switching Mechanism

**Implementation Strategy:**

1. **Repository Interfaces** (in `application/interfaces/`):
   - Define methods like `createUser()`, `findUserByEmail()`, etc.
   - Use Cases depend ONLY on these interfaces, not implementations.

2. **Concrete Implementations** (in `infrastructure/database/`):
   - `PostgresUserRepository.js` implements `IUserRepository` using SQL queries.
   - `MongoUserRepository.js` implements `IUserRepository` using MongoDB queries.

3. **Factory Pattern** (in `infrastructure/factories/RepositoryFactory.js`):
   ```javascript
   const DB_TYPE = process.env.DB_TYPE || 'postgres';

   function createRepositories() {
     if (DB_TYPE === 'postgres') {
       return {
         userRepository: new PostgresUserRepository(),
         listRepository: new PostgresToDoListRepository(),
         itemRepository: new PostgresToDoItemRepository(),
       };
     } else if (DB_TYPE === 'mongo') {
       return {
         userRepository: new MongoUserRepository(),
         listRepository: new MongoToDoListRepository(),
         itemRepository: new MongoToDoItemRepository(),
       };
     }
     throw new Error(`Unsupported DB_TYPE: ${DB_TYPE}`);
   }
   ```

4. **Dependency Injection**:
   - The factory creates the repositories at app startup.
   - Controllers receive repositories as constructor arguments.
   - Use Cases receive repositories as constructor arguments.

### 7.5 API Endpoints

**Authentication:**
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT

**ToDoLists (Protected):**
- `GET /api/lists` - Get all lists for the authenticated user
- `POST /api/lists` - Create a new list
- `PUT /api/lists/:id` - Update a list
- `DELETE /api/lists/:id` - Delete a list

**ToDoItems (Protected):**
- `GET /api/lists/:listId/items` - Get all items in a list
- `POST /api/lists/:listId/items` - Create a new item
- `PUT /api/items/:id` - Update an item
- `PATCH /api/items/:id/toggle` - Toggle completion status
- `DELETE /api/items/:id` - Delete an item

### 7.6 JWT Authentication Flow

1. User registers → password is hashed → user stored in DB
2. User logs in → credentials validated → JWT signed with user ID → JWT returned
3. Frontend stores JWT (localStorage or sessionStorage)
4. Frontend sends JWT in `Authorization: Bearer <token>` header on protected routes
5. Backend middleware verifies JWT → extracts user ID → attaches to `req.user`
6. Controllers use `req.user.id` to filter data by user

---

## 8. Success Metrics

Since this is a portfolio/educational project, success is measured by **architectural quality** rather than user metrics:

1. **Clean Architecture Compliance:**
   - Core domain logic (Entities, Use Cases) has zero dependencies on frameworks or databases.
   - Repository interfaces are defined in the Use Cases layer.
   - All dependencies point inward (Dependency Rule).

2. **Database Swappability:**
   - Switching from PostgreSQL to MongoDB (via `DB_TYPE` env var) works without code changes to Use Cases.
   - Both database implementations pass the same integration tests.

3. **Code Organization:**
   - Folder structure clearly reflects the four layers of Clean Architecture.
   - Files are small, focused, and easy to understand.

4. **User Experience:**
   - The UI is intuitive and pleasant to use.
   - The color palette is consistently applied.
   - Users can perform all core tasks without confusion.

5. **Portfolio Value:**
   - The README clearly explains the architecture and design decisions.
   - The project demonstrates deep understanding of software design principles.
   - Code is clean, well-commented, and easy for others to learn from.

---

## 9. Open Questions

### 9.1 Answered (Based on User Input)
- ✅ Backend language/framework: **Node.js/Express (JavaScript)**
- ✅ Frontend framework: **React (TypeScript)**
- ✅ Testing strategy: **Minimal (focus on architecture)**
- ✅ UI complexity: **Clean and polished (with provided color palette)**

### 9.2 Implementation Details to Decide

1. **JWT Secret Management:**
   - Should the JWT secret be stored in `.env` file?
   - What should be the default token expiration time? (Recommend: 24 hours)

2. **Date Handling:**
   - Should dates be stored in UTC and converted in the frontend?
   - What format should the frontend display dates in? (e.g., "MM/DD/YYYY" or "DD/MM/YYYY")

3. **Frontend Routing:**
   - Should we use React Router for multi-page navigation?
   - Routes: `/login`, `/register`, `/lists`, `/lists/:id`

4. **Error Handling:**
   - How should validation errors be returned? (Recommend: `{ error: "message" }` with appropriate HTTP status codes)
   - Should domain validation errors be separate from infrastructure errors?

5. **Docker Compose Setup:**
   - Should `docker-compose.yml` include both Postgres AND Mongo, or two separate compose files?
   - What ports should be exposed? (Recommend: Backend on 5000, Frontend on 3000, Postgres on 5432, Mongo on 27017)

6. **Seeding Strategy:**
   - Should seed data include sample users with hashed passwords?
   - How many demo lists and items should be created?

---

## 10. Next Steps (Implementation Order)

### Phase 1: Setup & Core Architecture (Foundation)
1. Initialize project structure (backend + frontend + docker)
2. Set up PostgreSQL and MongoDB with Docker Compose
3. Create database schemas and seed data
4. Implement Domain Entities (User, ToDoList, ToDoItem)

### Phase 2: Backend Core (Clean Architecture Implementation)
5. Define Repository Interfaces
6. Implement PostgreSQL repositories
7. Implement MongoDB repositories
8. Create Repository Factory
9. Implement Use Cases (Auth, Lists, Items)

### Phase 3: Backend API Layer
10. Set up Express server and routes
11. Implement Controllers
12. Implement JWT authentication middleware
13. Connect Use Cases to Controllers

### Phase 4: Frontend
14. Set up React app with TypeScript
15. Implement authentication pages (Login, Register)
16. Implement Lists Overview page
17. Implement List Detail page
18. Integrate with backend API
19. Apply color palette and styling

### Phase 5: Integration & Polish
20. Test database switching (Postgres ↔ Mongo)
21. Write README with architecture explanation
22. Clean up code and add comments
23. Create demo video or screenshots

---

## 11. Deliverables Checklist

- [ ] Complete source code with Clean Architecture folder structure
- [ ] `docker-compose.yml` with app, Postgres, and Mongo services
- [ ] PostgreSQL schema (`schema.sql`) and seed data (`seed.sql`)
- [ ] MongoDB schema documentation and seed data (`seed.json`)
- [ ] Frontend with all required pages and components
- [ ] JWT authentication implemented and tested
- [ ] Database switching mechanism working
- [ ] README.md with:
  - Architecture explanation
  - Setup instructions
  - How to switch databases
  - Diagram of layers and dependencies
- [ ] `.env.example` files for configuration

---

## 12. References & Resources

**Clean Architecture:**
- Book: *Clean Architecture* by Robert C. Martin
- Key Principle: The Dependency Rule (dependencies point inward)

**Domain-Driven Design:**
- Entities contain business rules
- Use Cases orchestrate business logic
- Repositories abstract data persistence

**Authentication Best Practices:**
- Hash passwords with bcrypt (salt rounds: 10-12)
- Use JWT with short expiration times
- Store JWT securely on the client (httpOnly cookies or secure storage)

---

**Document Version:** 1.0  
**Last Updated:** October 23, 2025  
**Target Audience:** Junior Developer implementing Clean Architecture  
**Estimated Implementation Time:** 20-30 hours for a focused developer

