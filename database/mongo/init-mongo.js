// MongoDB Initialization Script
// This script creates the database, user, and loads seed data

db = db.getSiblingDB('tododb');

// Create indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.todoLists.createIndex({ userId: 1 });
db.todoItems.createIndex({ listId: 1 });
db.todoItems.createIndex({ userId: 1 });
db.todoItems.createIndex({ isCompleted: 1 });

print('MongoDB initialized successfully!');
print('Database: tododb');
print('Collections ready: users, todoLists, todoItems');

