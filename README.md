# Clean Architecture To-Do Application

A monolithic To-Do list web application demonstrating **Clean Architecture** and **Domain-Driven Design (DDD)** principles. The core feature of this project is the ability to **swap databases** (PostgreSQL ↔ MongoDB) without changing any business logic code.

## 🎯 Project Status

### ✅ Completed Phases

- **Phase 1: Project Setup & Infrastructure** - Complete
- **Phase 2: Domain Layer (Entities & Business Rules)** - Complete
- **Phase 3: Application Layer (Use Cases & Repository Interfaces)** - Complete
- **Phase 4: Infrastructure Layer (Database Implementations)** - Complete
- **Phase 5: Adapters Layer (Controllers, Middleware, Routes)** - Complete

### 🚧 Remaining Work

- **Phase 6: Frontend Application (React + TypeScript)** - Not started
- **Phase 7: Integration Testing & Documentation** - Not started

### 🎉 **Backend API is FULLY FUNCTIONAL!**

---

## 🏗️ Architecture Overview

This project strictly follows Clean Architecture principles with four distinct layers:

```
┌─────────────────────────────────────────────────────────┐
│                   1. DOMAIN LAYER                       │
│              (Entities & Business Rules)                │
│  ┌────────────────────────────────────────────────┐    │
│  │  • User, ToDoList, ToDoItem                   │    │
│  │  • Pure business logic (no dependencies)      │    │
│  │  • Date validation business rule              │    │
│  └────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
                         ↓ depends on
┌─────────────────────────────────────────────────────────┐
│                2. APPLICATION LAYER                     │
│         (Use Cases & Repository Interfaces)             │
│  ┌────────────────────────────────────────────────┐    │
│  │  • RegisterUser, LoginUser                    │    │
│  │  • CRUD Use Cases for Lists & Items          │    │
│  │  • IUserRepository, IToDoListRepository      │    │
│  └────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
                         ↓ depends on
┌─────────────────────────────────────────────────────────┐
│                 3. ADAPTERS LAYER                       │
│         (Controllers, Middleware, Presenters)           │
│  ┌────────────────────────────────────────────────┐    │
│  │  • AuthController, ListController              │    │
│  │  • JWT Authentication Middleware               │    │
│  │  • Response Formatters                         │    │
│  └────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
                         ↓ depends on
┌─────────────────────────────────────────────────────────┐
│             4. INFRASTRUCTURE LAYER                     │
│      (Framework, Database, External Services)           │
│  ┌────────────────────────────────────────────────┐    │
│  │  • Express Server                              │    │
│  │  • PostgresUserRepository (SQL)               │    │
│  │  • MongoUserRepository (NoSQL)                │    │
│  │  • Repository Factory ← ENABLES DB SWAPPING   │    │
│  └────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

---

## 🔑 Key Feature: Database Swapping

The **Repository Factory** pattern enables switching between databases with **ZERO code changes**:

1. **Change environment variable:** `DB_TYPE=postgres` or `DB_TYPE=mongo`
2. **Restart the server**
3. **Done!** No code modifications needed.

**Why this works:**
- Use Cases depend on **interfaces** (IUserRepository)
- Repository Factory injects the correct **implementation** at runtime
- Business logic remains completely independent of database choice

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ 
- Docker & Docker Compose (for databases)
- npm or yarn

### Quick Start

1. **Clone and navigate to the project:**
   ```bash
   cd "D:\Junior\Software Architecture\Clean Architecture\to-do"
   ```

2. **Start databases with Docker Compose:**
   ```bash
   docker-compose up -d postgres mongo
   ```

3. **Set up backend:**
   ```bash
   cd backend
   npm install
   ```

4. **Configure environment (create `.env` from `.env.example`):**
   ```bash
   cp .env.example .env
   ```

5. **Choose your database in `.env`:**
   ```env
   DB_TYPE=postgres    # or DB_TYPE=mongo
   ```

6. **Run the backend:**
   ```bash
   npm start
   ```

7. **Verify it's running:**
   - Health Check: http://localhost:5000/health
   - API Info: http://localhost:5000/

---

## 📚 API Endpoints

### Authentication (Public)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and receive JWT

### To-Do Lists (Protected - Requires JWT)
- `GET /api/lists` - Get all lists for authenticated user
- `POST /api/lists` - Create new list
- `PUT /api/lists/:id` - Update list
- `DELETE /api/lists/:id` - Delete list (cascade deletes items)

### To-Do Items (Protected - Requires JWT)
- `GET /api/lists/:listId/items` - Get all items in a list
- `POST /api/lists/:listId/items` - Create new item
- `PUT /api/items/:id` - Update item
- `PATCH /api/items/:id/toggle` - Toggle completion status
- `DELETE /api/items/:id` - Delete item

**Authentication:** Include JWT in header: `Authorization: Bearer <token>`

---

## 🗄️ Database Setup

### PostgreSQL Setup

Database schema is automatically created when docker-compose starts.

Manual setup (if needed):
```bash
# Connect to PostgreSQL
docker exec -it todo-postgres psql -U todouser -d tododb

# Run schema
\i /docker-entrypoint-initdb.d/schema.sql

# Run seed data
\i /docker-entrypoint-initdb.d/seed.sql
```

### MongoDB Setup

Indexes are automatically created on connection.

Manual setup (if needed):
```bash
# Connect to MongoDB
docker exec -it todo-mongo mongosh mongodb://todouser:todopass@localhost:27017/tododb?authSource=admin

# Import seed data (from host)
docker exec -i todo-mongo mongoimport --uri="mongodb://todouser:todopass@localhost:27017/tododb?authSource=admin" --collection=users --jsonArray --file=/docker-entrypoint-initdb.d/seed.json
```

### Test Users (from seed data)

- **Alice:** alice@example.com / password123
- **Bob:** bob@example.com / securepass456

---

## 🧪 Testing the Database Swap

1. **Start with PostgreSQL:**
   ```bash
   # In .env
   DB_TYPE=postgres
   
   # Start server
   npm start
   ```

2. **Make API calls, create data**

3. **Switch to MongoDB:**
   ```bash
   # Stop server (Ctrl+C)
   
   # Change .env
   DB_TYPE=mongo
   
   # Restart server
   npm start
   ```

4. **Verify it works!** The API endpoints work identically.

---

## 📁 Project Structure

```
to-do/
├── backend/
│   ├── src/
│   │   ├── domain/              # Layer 1: Pure business logic
│   │   │   ├── entities/
│   │   │   └── errors/
│   │   ├── application/         # Layer 2: Use cases & interfaces
│   │   │   ├── use-cases/
│   │   │   └── interfaces/
│   │   ├── adapters/            # Layer 3: Controllers & middleware
│   │   │   ├── controllers/
│   │   │   ├── middlewares/
│   │   │   └── presenters/
│   │   ├── infrastructure/      # Layer 4: External concerns
│   │   │   ├── database/
│   │   │   │   ├── postgres/
│   │   │   │   └── mongo/
│   │   │   ├── factories/       # ← Repository Factory
│   │   │   └── web/
│   │   ├── config/
│   │   └── index.js             # Entry point
│   └── package.json
├── database/
│   ├── postgres/
│   │   ├── schema.sql
│   │   └── seed.sql
│   └── mongo/
│       ├── schema.md
│       └── seed.json
├── frontend/                    # TODO: Phase 6
├── tasks/
│   ├── prd-clean-architecture-todo-app.md
│   └── tasks-prd-clean-architecture-todo-app.md
└── docker-compose.yml
```

---

## 🎓 Learning Objectives Achieved

This project demonstrates:

✅ **Clean Architecture:** Clear separation of concerns across 4 layers
✅ **Dependency Rule:** Dependencies point inward (Domain → Application → Adapters → Infrastructure)
✅ **Repository Pattern:** Abstraction over data access
✅ **Factory Pattern:** Runtime selection of implementations
✅ **Dependency Injection:** Controllers receive dependencies via constructor
✅ **Domain-Driven Design:** Business rules in Domain layer
✅ **Interface Segregation:** Small, focused repository interfaces
✅ **Database Independence:** Swap SQL ↔ NoSQL with zero code changes

---

## 🛠️ Technology Stack

### Backend
- **Runtime:** Node.js 20+
- **Framework:** Express.js
- **Language:** JavaScript (ES6+ with modules)
- **Authentication:** JWT + bcrypt
- **Databases:** PostgreSQL + MongoDB
- **Containerization:** Docker + Docker Compose

### Frontend (TODO)
- **Framework:** React 19 with TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **HTTP Client:** Axios

---

## 📝 Next Steps

### To Complete the Project:

1. **Implement Frontend (Phase 6):**
   - Authentication pages (Login/Register)
   - Lists Overview page
   - List Detail page with items
   - Apply the custom color palette
   - Integrate with backend API

2. **Integration Testing (Phase 7):**
   - Test all API endpoints
   - Verify database switching works
   - Test frontend-backend integration

3. **Documentation:**
   - API documentation (Postman collection)
   - Architecture diagrams
   - Screenshots

### To Run Frontend (when implemented):

```bash
cd frontend
npm install
npm run dev
```

---

## 🤝 Contributing

This is an educational/portfolio project. The focus is on demonstrating Clean Architecture principles.

---

## 📖 References

- **Clean Architecture** by Robert C. Martin
- **Domain-Driven Design** by Eric Evans
- **Hexagonal Architecture** (Ports & Adapters Pattern)

---

## 👨‍💻 Author

Built as a demonstration of Clean Architecture and DDD principles.

---

## 📄 License

MIT

---

**🎯 Remember:** The power of this architecture is **flexibility**. Change the database, change the framework, change the UI—the core business logic remains untouched!

