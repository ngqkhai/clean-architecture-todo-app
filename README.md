
# Clean Architecture To-Do App

This repository is an educational project demonstrating a multi-user, monolithic To-Do list web application built following **Clean Architecture** and **Domain-Driven Design (DDD)** principles.

The primary goal is to create a system that is:
- **Testable:** Business logic can be tested without a UI, DB, or web server.
- **Maintainable:** Low coupling between layers means changes are easy and safe.
- **Flexible:** The framework and database are "details" that can be swapped out.

The core feature of this project is the ability to **swap the database** (PostgreSQL ↔ MongoDB) at runtime via an environment variable, without changing a single line of business logic.

---

## ✨ Key Features

- **User Authentication:** Secure registration and login (JWT).
- **Multi-User:** Private to-do lists and items for each user.
- **Task Management:** Full CRUD operations for ToDoLists and ToDoItems.
- **Task Scheduling:** Add start dates and deadline dates to tasks.
- **Swappable Database:** Runs on **PostgreSQL** or **MongoDB** without changing a single line of business logic.

---

## 🚀 Tech Stack

- **Backend:** Node.js (v20+) with Express
- **Frontend:** Next.js (App Router) with TypeScript and Tailwind CSS
- **Database:** PostgreSQL & MongoDB (runtime switch via `DB_TYPE` env var)
- **Containerization:** Docker & Docker Compose
- **Architecture:** Clean Architecture

---

## 📚 What is Clean Architecture?

Clean Architecture, popularized by Robert C. Martin ("Uncle Bob"), is a software design philosophy that separates concerns into distinct layers.



The one, overriding rule is **The Dependency Rule:**

> Source code dependencies can only point **inwards**. Nothing in an inner circle can know anything at all about something in an outer circle.

This means:

1.  **Entities (Domain):** The core business objects and rules (e.g., a `ToDoItem` must have a `title`). They know nothing about the application.
2.  **Use Cases (Application):** The application-specific logic (e.g., `CreateToDoItemUseCase`). They know about Entities, but not about the database or the web.
3.  **Interface Adapters:** The "glue" layer. This includes Controllers, Presenters, and **Repository Interfaces**.
4.  **Frameworks & Drivers:** The outermost layer. This is where the database, web framework (Express), and UI (Next.js) live. They are "details."

---

## 🏛️ How This Repo Demonstrates Clean Architecture

This project strictly adheres to the Clean Architecture layers and The Dependency Rule.

### 1. The Core Layers (Domain & Application)

-   **`/backend/src/domain` (Entities):** Contains the plain objects (`User`, `ToDoList`, `ToDoItem`) and their business rules. They have zero outside dependencies.
-   **`/backend/src/application` (Use Cases):** Contains all the features of the app (e.g., `RegisterUser`, `CreateList`, `GetItemsForList`).
-   **The Dependency Rule in Action:** The Use Cases *do not* talk to a database directly. Instead, they depend on **Repository Interfaces** (e.g., `IToDoListRepository`) defined in the application layer.

### 2. The "Swappable Database" Benefit

This is the key demonstration of the architecture's power:

1.  The **Application** layer defines an interface, like `IToDoListRepository`, with methods like `save(list)` and `findById(id)`.
2.  The **Infrastructure** layer (outermost) provides two **concrete implementations** of that interface:
    -   `PostgresToDoListRepository`
    -   `MongoToDoListRepository`
3.  When the application starts, a **Factory** in the infrastructure layer reads an environment variable (`DB_TYPE`) and uses **Dependency Injection** to "inject" the *correct* implementation into the Use Cases.

The Use Cases *never know* if they are talking to Postgres or Mongo. They only know they are talking to something that fulfills the `IToDoListRepository` contract.

### 3. Detailed Project Structure

```

to-do/
├── backend/
│   ├── src/
│   │   ├── domain/               \# Layer 1: Pure business logic
│   │   │   ├── entities/
│   │   │   └── errors/
│   │   ├── application/            \# Layer 2: Use cases & interfaces
│   │   │   ├── use-cases/
│   │   │   └── interfaces/
│   │   ├── adapters/               \# Layer 3: Controllers & middleware
│   │   │   ├── controllers/
│   │   │   ├── middlewares/
│   │   │   └── presenters/
│   │   ├── infrastructure/         \# Layer 4: External concerns
│   │   │   ├── database/
│   │   │   │   ├── postgres/
│   │   │   │   └── mongo/
│   │   │   ├── factories/          \# ← Repository Factory
│   │   │   └── web/
│   │   ├── config/
│   │   └── index.js                \# Entry point
│   ├── Dockerfile
│   └── package.json
├── database/
│   ├── postgres/
│   │   ├── schema.sql
│   │   └── seed.sql
│   └── mongo/
│       ├── schema.md
│       └── seed.json
├── frontend/                     \# Frontend App (Next.js)
│   ├── app/
│   ├── components/
│   └── Dockerfile
├── tasks/
│   ├── prd-clean-architecture-todo-app.md
│   └── tasks-prd-clean-architecture-todo-app.md
└── docker-compose.yml

````

---

## 🎓 Learning Objectives Achieved

This project successfully demonstrates:

- **Clean Architecture:** Clear separation of concerns across 4 layers.
- **The Dependency Rule:** Dependencies point inward.
- **Repository Pattern:** Abstraction over data access.
- **Factory Pattern:** Runtime selection of implementations.
- **Dependency Injection:** Injecting dependencies (like repositories) into controllers and use cases.
- **Domain-Driven Design:** Business rules are isolated in the Domain layer.
- **Database Independence:** Swap SQL ↔ NoSQL with zero code changes.

---

## 👍 Pros and 👎 Cons of Clean Architecture

### Pros
-   **True Independence:** Your business logic (Use Cases) doesn't depend on the web framework, UI, or database.
-   **High Testability:** You can test your core logic and use cases in isolation, without needing a real database or starting a web server.
-   **Maintainability:** Layers are decoupled, so you can change the database (like we do here!) or the UI framework without breaking the business rules.

### Cons
-   **Increased Complexity:** There is more "boilerplate" (more files, interfaces, mappers) than in a simple monolithic app.
-   **Steep Learning Curve:** Understanding the flow of data (e.g., DTOs vs. Entities) and dependency injection can be challenging at first.
-   **Potential for Over-engineering:** For a very small, simple CRUD app, this architecture can be overkill.

---

## 🚀 Getting Started

### Prerequisites
-   Node.js 18+
-   Docker & Docker Compose

### 1. Clone & Configure
```bash
# Clone the repo
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name

# Copy the example .env file
cp .env.example .env
````

### 2\. Set Up Your `.env` File

Open the `.env` file and configure your settings. Most importantly, choose your database:

```env
# Set DB_TYPE to "postgres" or "mongo"
DB_TYPE="postgres"

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=1d

# Server Port
PORT=5000

# DB Credentials (used by docker-compose)
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=todo_db
```

### 3\. Run with Docker Compose

This is the easiest way to run the entire stack (backend, frontend, and both databases).

```bash
# Build and start all services in detached mode
docker-compose up -d --build
```

  - **Backend API** will be running at `http://localhost:5000`
  - **Frontend App** will be running at `http://localhost:3000`

-----

## 🧪 Testing the Database Swap

1.  **Start with PostgreSQL:**

      - Set `DB_TYPE="postgres"` in your `.env` file.
      - Run `docker-compose up -d --build`
      - Access the app, register a user, and create some to-do items.

2.  **Switch to MongoDB:**

      - Stop the containers: `docker-compose down`
      - Change your `.env` file to `DB_TYPE="mongo"`.
      - Start the containers again: `docker-compose up -d`
      - Access the app. You will need to register a *new* user, as the data is now coming from the empty MongoDB database.

You can swap back and forth to verify that the application logic works identically, regardless of the database source.
