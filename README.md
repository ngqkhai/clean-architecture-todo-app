# Clean Architecture To-Do List Application

A modern, full-stack to-do list application built with **Clean Architecture** principles and **Domain-Driven Design (DDD)**. This project demonstrates database abstraction, allowing seamless switching between **PostgreSQL** and **MongoDB** without changing any business logic.

## 🌟 Features

### Core Functionality
- ✅ **User Authentication** - Secure registration, login with JWT tokens
- ✅ **Multi-User Support** - Each user has their own isolated to-do lists
- ✅ **To-Do Lists** - Create, read, update, delete lists
- ✅ **To-Do Items** - Manage tasks with titles, descriptions, dates
- ✅ **Date Management** - Set start dates and deadlines for tasks
- ✅ **Visual Indicators** - Overdue (red), upcoming (yellow), completed (gray)
- ✅ **Authorization** - Users can only access their own data

### Technical Highlights
- 🏗️ **Clean Architecture** - Strict layer separation (Domain, Application, Infrastructure, Presentation)
- 🔄 **Database Agnostic** - Switch between PostgreSQL and MongoDB via environment variable
- 🔐 **Secure** - bcrypt password hashing, JWT authentication
- 🎨 **Modern UI** - React, TypeScript, Tailwind CSS, Framer Motion animations
- 📦 **Containerized** - Docker and Docker Compose ready
- 🧪 **Type-Safe** - Full TypeScript implementation
- 📱 **Responsive** - Mobile, tablet, and desktop support

## 📁 Project Structure

```
to-do/
├── backend/                    # Node.js/Express backend
│   ├── src/
│   │   ├── domain/            # Domain layer (entities, value objects)
│   │   │   ├── entities/      # User, ToDoList, ToDoItem
│   │   │   └── value-objects/ # Email, Password, DateRange
│   │   ├── application/       # Application layer (use cases, interfaces)
│   │   │   ├── repositories/  # Repository interfaces
│   │   │   ├── services/      # Service interfaces
│   │   │   └── use-cases/     # Business logic use cases
│   │   ├── infrastructure/    # Infrastructure layer
│   │   │   ├── database/      # Database implementations
│   │   │   │   ├── postgres/  # PostgreSQL repositories
│   │   │   │   ├── mongodb/   # MongoDB repositories
│   │   │   │   ├── factory/   # RepositoryFactory
│   │   │   │   └── seeds/     # Seed data scripts
│   │   │   ├── security/      # BcryptPasswordHasher, JwtTokenService
│   │   │   └── web/           # Express controllers, routes, middleware
│   │   └── index.ts           # Application entry point
│   ├── Dockerfile
│   └── package.json
│
├── frontend/                   # React/TypeScript frontend
│   ├── src/
│   │   ├── api/               # API client and services
│   │   ├── components/        # React components
│   │   ├── contexts/          # AuthContext
│   │   ├── hooks/             # Custom hooks (useAuth, useToDoLists, etc.)
│   │   ├── pages/             # Page components
│   │   ├── types/             # TypeScript type definitions
│   │   ├── utils/             # Token storage utilities
│   │   ├── App.tsx            # Main app with routing
│   │   └── main.tsx           # Entry point
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── docker-compose.yml          # Orchestration for all services
├── README.md                   # This file
└── tasks/                      # Project documentation
    ├── prd-todo-clean-architecture.md
    └── tasks-prd-todo-clean-architecture.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn
- Docker and Docker Compose (for containerized deployment)
- PostgreSQL 16 (if running locally without Docker)
- MongoDB 7 (optional, if using MongoDB)

### Installation

#### Option 1: Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd to-do
   ```

2. **Start with PostgreSQL (default)**
   ```bash
   docker-compose up -d
   ```

3. **Or start with MongoDB**
   ```bash
   DB_TYPE=mongo docker-compose --profile mongo up -d
   ```

4. **Access the application**
   - Frontend: http://localhost
   - Backend API: http://localhost:3000
   - Health Check: http://localhost:3000/health

#### Option 2: Local Development

**Backend Setup:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run dev
```

**Frontend Setup:**
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with API URL
npm run dev
```

### Seeding Data

The application comes with seed data (2 users, 3 lists, 6 items).

**PostgreSQL:**
```bash
cd backend
npm run seed:postgres
```

**MongoDB:**
```bash
cd backend
npm run seed:mongo
```

**Seed Users:**
- alice@example.com / password123
- bob@example.com / password456

## 🔧 Configuration

### Environment Variables

**Backend (`backend/.env`):**
```env
# Server
NODE_ENV=development
PORT=3000

# Database Type ('postgres' or 'mongo')
DB_TYPE=postgres

# PostgreSQL
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DATABASE=todo_db

# MongoDB
MONGO_URI=mongodb://localhost:27017/todo_db

# Security
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRATION=24h
BCRYPT_SALT_ROUNDS=10
```

**Frontend (`frontend/.env`):**
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## 🏗️ Architecture

### Clean Architecture Layers

1. **Domain Layer** (`/domain`)
   - Contains business entities and value objects
   - Zero external dependencies
   - Pure business logic

2. **Application Layer** (`/application`)
   - Use cases (business operations)
   - Repository interfaces
   - Service interfaces
   - Dependency inversion principle

3. **Infrastructure Layer** (`/infrastructure`)
   - Database implementations (PostgreSQL, MongoDB)
   - Security services (bcrypt, JWT)
   - Web framework (Express)
   - External integrations

4. **Presentation Layer** (`/frontend`)
   - React components
   - UI/UX logic
   - API communication

### Database Abstraction

The key to database abstraction is the **Repository Pattern** combined with **Factory Pattern**:

- Repository interfaces defined in Application layer
- Concrete implementations in Infrastructure layer
- `RepositoryFactory` selects implementation based on `DB_TYPE`
- Use cases depend only on interfaces

**Switching databases is as simple as:**
```env
DB_TYPE=postgres  # or 'mongo'
```

No code changes required!

## 🛠️ Development

### Available Scripts

**Backend:**
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm start            # Start production server
npm run seed:postgres # Seed PostgreSQL database
npm run seed:mongo    # Seed MongoDB database
```

**Frontend:**
```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

### API Endpoints

**Authentication:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

**To-Do Lists:**
- `POST /api/lists` - Create list (protected)
- `GET /api/lists` - Get all user's lists (protected)
- `GET /api/lists/:id` - Get specific list (protected)
- `PUT /api/lists/:id` - Update list (protected)
- `DELETE /api/lists/:id` - Delete list (protected)

**To-Do Items:**
- `POST /api/items/lists/:listId/items` - Create item (protected)
- `GET /api/items/lists/:listId/items` - Get items in list (protected)
- `PUT /api/items/:id` - Update item (protected)
- `PATCH /api/items/:id/complete` - Toggle completion (protected)
- `DELETE /api/items/:id` - Delete item (protected)

## 🎨 UI Features

- **Authentication Pages** - Beautiful login/register forms
- **Dashboard** - Grid of to-do lists
- **List Detail** - View and manage items
- **Animations** - Smooth Framer Motion transitions
- **Status Indicators** - Visual feedback for overdue/upcoming tasks
- **Responsive Design** - Works on all screen sizes
- **Modern Styling** - Tailwind CSS with custom components

## 📚 Design Principles

### SOLID Principles
- **Single Responsibility** - Each class has one reason to change
- **Open/Closed** - Open for extension, closed for modification
- **Liskov Substitution** - Interfaces can be substituted
- **Interface Segregation** - Specific interfaces over general ones
- **Dependency Inversion** - Depend on abstractions, not concretions

### DDD Concepts
- **Entities** - Objects with identity (User, ToDoList, ToDoItem)
- **Value Objects** - Immutable objects without identity (Email, Password, DateRange)
- **Repositories** - Abstract data access
- **Use Cases** - Application-specific business rules

## 🐳 Docker Deployment

### Build Images
```bash
# Build backend
docker build -t todo-backend ./backend

# Build frontend
docker build -t todo-frontend ./frontend
```

### Run with Docker Compose
```bash
# PostgreSQL
docker-compose up -d

# MongoDB
DB_TYPE=mongo docker-compose --profile mongo up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🤝 Contributing

This is a demonstration project showcasing Clean Architecture and DDD principles. Feel free to fork and adapt for your needs!

## 📝 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Clean Architecture by Robert C. Martin
- Domain-Driven Design by Eric Evans
- React, TypeScript, and the amazing open-source community

---

Built with ❤️ using Clean Architecture principles

